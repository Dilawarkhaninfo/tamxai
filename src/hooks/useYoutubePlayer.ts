import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface UseYoutubePlayerProps {
  videoId: string;
  onReady?: (player: any) => void;
  onStateChange?: (event: any) => void;
}

export const useYoutubePlayer = ({ videoId, onReady, onStateChange }: UseYoutubePlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const initializePlayer = useCallback(() => {
    if (!containerRef.current || !window.YT || !window.YT.Player) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        mute: 1,
        playsinline: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        color: 'white',
      },
      events: {
        onReady: (event: any) => {
          setIsPlayerReady(true);
          setIsMuted(event.target.isMuted());
          // Set higher quality if possible
          if (event.target.setPlaybackQuality) {
            event.target.setPlaybackQuality('hd1080');
          }
          if (onReady) onReady(event.target);
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          if (onStateChange) onStateChange(event);
        },
      },
    });
  }, [videoId, onReady, onStateChange]);

  useEffect(() => {
    // 1. Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // 2. If not, load the script
      if (!document.getElementById('youtube-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // 3. Define the global callback
      const previousOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousOnReady) previousOnReady();
        initializePlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [initializePlayer]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying, isPlayerReady]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, [isPlayerReady]);

  return {
    containerRef,
    playerRef,
    isPlayerReady,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
  };
};
