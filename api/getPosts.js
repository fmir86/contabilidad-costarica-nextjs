const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

module.exports = (req, res) => {
  const { slug } = req.query;
  const filePath = path.join(process.cwd(), 'blogposts', `${slug}.md`);
  
  console.log('Looking for file:', filePath);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);    
    
    const htmlContent = marked(content);
    return res.status(200).json({ data, content: htmlContent });
  } catch (error) {
    console.error('Error reading file:', error);  // <-- Add this
    return res.status(404).json({ error: 'Post not found' });
  }
};
