import blog1 from '../../images/blog-1.jpg';
import blog2 from '../../images/blog-2.jpg';
import blog3 from '../../images/blog-3.jpg';
import blog4 from '../../images/blog-4.jpg';
import blog5 from '../../images/blog-5.jpg';
import blog6 from '../../images/blog-6.jpg';
import blog7 from '../../images/blog-7.jpg';
import blog8 from '../../images/blog-8.jpg';
import blog9 from '../../images/blog-9.jpg';
import blogFeature from '../../images/blogFeature.jpg';

const BlogListing = [
    {
        id: 0,
        title: 'blog 1: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>" +
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>",
        image: blog1,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Healthcare',
    },
    {
        id: 1,
        title: 'blog 2: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog2,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Nails',
    },
    {
        id: 2,
        title: 'blog 3: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog3,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Hair',
    },
    {
        id: 3,
        title: 'blog 4: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog4,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Lashes & Brows',
    },
    {
        id: 4,
        title: 'blog 5: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog5,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Skincare',
    },
    {
        id: 5,
        title: 'blog 6: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog6,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Retreats',
    },
    {
        id: 6,
        title: 'blog 7: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog7,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Keep fit',
    },
    {
        id: 7,
        title: 'blog 8: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog8,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Barbers',
    },
    {
        id: 8,
        title: 'blog 9: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blog9,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Healthcare',
    },
    {
        id: 9,
        title: 'blog 10: The Quick Brown Fox Jumps Over The Lazy Dog',
        description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
        image: blogFeature,
        author: 'John Doe',
        slug: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
        date: new Date().toISOString(),
        category: 'Keep fit',
    }
];

export default BlogListing;
