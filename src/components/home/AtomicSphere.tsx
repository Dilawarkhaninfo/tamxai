'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export function AtomicSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    let isSubscribed = true;

    // Responsive dimensions setup
    const updateDimensions = () => {
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.scale(dpr, dpr);
      return { w, h };
    };

    let { w: containerWidth, h: containerHeight } = updateDimensions();
    // Fixed globe radius — completely fixed, does not scale on hover or scroll
    const radius = Math.min(containerWidth, containerHeight) / 2.75;

    // Create D3 Orthographic Projection & Path Generator
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // Synchronous 1:1 mouse position tracking for dot scatter field
    const mousePos = { x: -9999, y: -9999 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -80 && x <= containerWidth + 80 && y >= -80 && y <= containerHeight + 80) {
        mousePos.x = x;
        mousePos.y = y;
      } else {
        mousePos.x = -9999;
        mousePos.y = -9999;
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 14) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.085;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    interface DotData {
      lng: number;
      lat: number;
      offsetX: number;
      offsetY: number;
    }

    const allDots: DotData[] = [];
    let landFeatures: any = null;

    const rotation: [number, number] = [0, -15];
    let autoRotate = true;
    const rotationSpeed = 0.35;

    // Dot repulsion field settings (float expand away when cursor approaches, contract back when cursor moves away)
    const repulsionRadius = 120; // Pixel radius around cursor that triggers float expansion
    const maxDisplacement = 32; // Max pixels dots float away from cursor

    const render = () => {
      if (!context) return;

      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = radius; // Completely FIXED size

      // Outer atmosphere ring & sphere backdrop (Fixed Size)
      context.save();
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(2, 2, 8, 0.85)';
      context.fill();

      context.strokeStyle = 'rgba(133, 135, 227, 0.4)';
      context.lineWidth = 1.5;
      context.stroke();
      context.restore();

      if (landFeatures) {
        // Graticule grid lines
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = 'rgba(162, 163, 233, 0.15)';
        context.lineWidth = 0.8;
        context.stroke();

        // Land continent outlines
        context.beginPath();
        landFeatures.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = 'rgba(105, 106, 172, 0.3)';
        context.lineWidth = 1;
        context.stroke();

        // Render Dotted Grid with float expansion away from cursor & smooth contraction back to original position
        const baseDotRadius = 1.25;

        allDots.forEach((dot) => {
          const home = projection([dot.lng, dot.lat]);
          if (
            home &&
            home[0] >= 0 &&
            home[0] <= containerWidth &&
            home[1] >= 0 &&
            home[1] <= containerHeight
          ) {
            const dx = home[0] - mousePos.x;
            const dy = home[1] - mousePos.y;
            const dist = Math.hypot(dx, dy);

            let targetDx = 0;
            let targetDy = 0;

            if (dist < repulsionRadius && dist > 0.001) {
              // Smooth cosine easing curve for displacement
              const proxFactor = Math.cos((dist / repulsionRadius) * (Math.PI / 2));
              
              // Displace dot in opposite direction of cursor
              const dirX = dx / dist;
              const dirY = dy / dist;
              const pushDistance = proxFactor * maxDisplacement;

              targetDx = dirX * pushDistance;
              targetDy = dirY * pushDistance;
            }

            // Smoothly interpolate current offset towards target offset for floating dynamics
            dot.offsetX += (targetDx - dot.offsetX) * 0.12;
            dot.offsetY += (targetDy - dot.offsetY) * 0.12;

            const renderX = home[0] + dot.offsetX;
            const renderY = home[1] + dot.offsetY;

            context.beginPath();
            context.arc(renderX, renderY, baseDotRadius, 0, 2 * Math.PI);
            context.fillStyle = 'rgba(145, 147, 215, 0.75)';
            context.fill();
          } else {
            // Reset offsets when dot is clipped/behind globe
            dot.offsetX = 0;
            dot.offsetY = 0;
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
        );
        if (!response.ok) throw new Error('Failed to load land data');

        const data = await response.json();
        if (!isSubscribed) return;

        landFeatures = data;
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 14);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, offsetX: 0, offsetY: 0 });
          });
        });
      } catch (err) {
        if (isSubscribed) setError('Failed to load land map data');
      }
    };

    // Continuous Animation Loop
    const animate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
      }
      render();
      if (isSubscribed) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Drag to rotate handlers
    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation] as [number, number];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.4;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 1000);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    loadWorldData().then(() => {
      if (isSubscribed) {
        animate();
      }
    });

    const handleResize = () => {
      const dims = updateDimensions();
      containerWidth = dims.w;
      containerHeight = dims.h;
      const newRadius = Math.min(containerWidth, containerHeight) / 2.75;
      projection.scale(newRadius).translate([containerWidth / 2, containerHeight / 2]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isSubscribed = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  if (error) return null;

  return (
    <div
      id="particles3d"
      className="absolute pointer-events-auto -mt-20 sm:mt-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[280px] sm:size-[560px] 2xl:size-[720px] z-10 flex items-center justify-center select-none"
    >
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
        />
        <div className="size-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>
    </div>
  );
}
