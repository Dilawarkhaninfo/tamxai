const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000');

  console.log('\n=== Step 1: Waiting 5 seconds for preloader to finish ===');
  await page.waitForTimeout(5000);

  console.log('Taking screenshot 1: Initial hero section...');
  await page.screenshot({ 
    path: 'screenshot-1-initial-hero.png',
    fullPage: false 
  });

  // Check initial state
  const initialState = await page.evaluate(() => {
    const sphere = document.querySelector('.atomic-sphere, canvas, [class*="sphere"]');
    const heroTitle = document.querySelector('h1, [class*="hero"] h1, [class*="title"]');
    const stats = document.querySelectorAll('[class*="stat"]');
    
    return {
      sphereExists: !!sphere,
      spherePosition: sphere ? sphere.getBoundingClientRect() : null,
      heroTitleExists: !!heroTitle,
      heroTitlePosition: heroTitle ? heroTitle.getBoundingClientRect() : null,
      heroTitleText: heroTitle ? heroTitle.textContent : null,
      statsCount: stats.length,
      scrollY: window.scrollY
    };
  });

  console.log('\n=== Initial State ===');
  console.log('Sphere visible:', initialState.sphereExists);
  console.log('Sphere position:', initialState.spherePosition);
  console.log('Hero title:', initialState.heroTitleText);
  console.log('Hero title position:', initialState.heroTitlePosition);
  console.log('Stats found:', initialState.statsCount);

  console.log('\n=== Step 2: Scrolling down 500px ===');
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  console.log('Taking screenshot 2: After 500px scroll...');
  await page.screenshot({ 
    path: 'screenshot-2-scroll-500px.png',
    fullPage: false 
  });

  const midScrollState = await page.evaluate(() => {
    const sphere = document.querySelector('.atomic-sphere, canvas, [class*="sphere"]');
    const heroTitle = document.querySelector('h1, [class*="hero"] h1, [class*="title"]');
    const stats = document.querySelectorAll('[class*="stat"]');
    
    return {
      spherePosition: sphere ? sphere.getBoundingClientRect() : null,
      heroTitlePosition: heroTitle ? heroTitle.getBoundingClientRect() : null,
      statsOpacity: stats.length > 0 ? window.getComputedStyle(stats[0].parentElement || stats[0]).opacity : null,
      scrollY: window.scrollY
    };
  });

  console.log('\n=== After 500px Scroll ===');
  console.log('Scroll position:', midScrollState.scrollY);
  console.log('Sphere position:', midScrollState.spherePosition);
  console.log('Hero title position:', midScrollState.heroTitlePosition);
  console.log('Stats opacity:', midScrollState.statsOpacity);

  console.log('\n=== Step 3: Scrolling down to 1000px ===');
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  console.log('Taking screenshot 3: After 1000px scroll...');
  await page.screenshot({ 
    path: 'screenshot-3-scroll-1000px.png',
    fullPage: false 
  });

  const finalScrollState = await page.evaluate(() => {
    const sphere = document.querySelector('.atomic-sphere, canvas, [class*="sphere"]');
    const heroTitle = document.querySelector('h1, [class*="hero"] h1, [class*="title"]');
    const servicesSection = document.querySelector('[class*="services"], #services, section:nth-of-type(2)');
    
    return {
      spherePosition: sphere ? sphere.getBoundingClientRect() : null,
      heroTitlePosition: heroTitle ? heroTitle.getBoundingClientRect() : null,
      servicesSectionVisible: servicesSection ? servicesSection.getBoundingClientRect().top < window.innerHeight : false,
      servicesSectionText: servicesSection ? servicesSection.textContent.substring(0, 100) : null,
      scrollY: window.scrollY
    };
  });

  console.log('\n=== After 1000px Scroll ===');
  console.log('Scroll position:', finalScrollState.scrollY);
  console.log('Sphere position:', finalScrollState.spherePosition);
  console.log('Hero title position:', finalScrollState.heroTitlePosition);
  console.log('Services section visible:', finalScrollState.servicesSectionVisible);
  console.log('Services section preview:', finalScrollState.servicesSectionText);

  console.log('\n=== Analysis Complete ===');
  console.log('Screenshots saved:');
  console.log('  - screenshot-1-initial-hero.png');
  console.log('  - screenshot-2-scroll-500px.png');
  console.log('  - screenshot-3-scroll-1000px.png');

  console.log('\n=== Summary ===');
  console.log('1. Particle sphere centered initially:', initialState.sphereExists && initialState.spherePosition);
  console.log('2. Sphere moves left on scroll:', midScrollState.spherePosition && midScrollState.spherePosition.left < (initialState.spherePosition?.left || 0));
  console.log('3. Hero title moves up on scroll:', midScrollState.heroTitlePosition && midScrollState.heroTitlePosition.top < (initialState.heroTitlePosition?.top || 0));
  console.log('4. Stats fade out:', midScrollState.statsOpacity && parseFloat(midScrollState.statsOpacity) < 1);

  console.log('\nPress Ctrl+C when done reviewing...');
  // Keep browser open for manual inspection
  await page.waitForTimeout(60000);

  await browser.close();
})();
