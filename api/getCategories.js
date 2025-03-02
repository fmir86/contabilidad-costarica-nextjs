const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = (req, res) => {
  const postsDirectory = path.join(process.cwd(), 'blogposts');

  try {
    // Leer todos los archivos Markdown de la carpeta blogposts
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
    const categoriesSet = new Set();

    files.forEach(file => {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      // Si el front matter tiene la propiedad category:
      if (data.category) {
        // Si se permiten múltiples categorías separadas por coma:
        const cats = data.category.split(/[,]+/).map(cat => cat.trim());
        cats.forEach(cat => {
          if (cat) categoriesSet.add(cat);
        });
      }
    });

    // Convertir el set a array y ordenarlo alfabéticamente (opcional)
    const categories = Array.from(categoriesSet).sort();

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Error reading categories' });
  }
};
