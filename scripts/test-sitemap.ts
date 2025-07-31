// scripts/test-sitemap.ts
// Run with: npx tsx scripts/test-sitemap.ts

import sitemap from '../src/app/sitemap';

async function testSitemap() {
  console.log('Testing sitemap generation...\n');
  
  try {
    const sitemapData = await sitemap();
    
    console.log(`Total URLs in sitemap: ${sitemapData.length}`);
    console.log('\nSitemap entries:\n');
    
    // Group by type
    const staticPages = sitemapData.filter(item => 
      !item.url.includes('/blog/') && !item.url.includes('/servicios/')
    );
    const blogPosts = sitemapData.filter(item => item.url.includes('/blog/'));
    const servicePages = sitemapData.filter(item => item.url.includes('/servicios/'));
    
    console.log('Static Pages:');
    staticPages.forEach(page => {
      console.log(`  - ${page.url} (Priority: ${page.priority})`);
    });
    
    console.log('\nBlog Posts:');
    blogPosts.forEach(post => {
      console.log(`  - ${post.url}`);
      if (post.images && post.images.length > 0) {
        console.log(`    Images: ${post.images.join(', ')}`);
      }
    });
    
    console.log('\nService Pages:');
    servicePages.forEach(service => {
      console.log(`  - ${service.url}`);
    });
    
    console.log('\n✅ Sitemap generated successfully!');
    console.log('\nTo view your sitemap in development, start your dev server and visit:');
    console.log('http://localhost:3000/sitemap.xml');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

testSitemap();
