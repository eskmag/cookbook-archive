import axios from 'axios';

interface BookData {
  title: string;
  author: string;
  description?: string;
  cover?: string;
}

export async function fetchBookByISBN(isbn: string): Promise<BookData | null> {
  try {
    // First try Open Library API
    const openLibraryResponse = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    
    if (openLibraryResponse.data[`ISBN:${isbn}`]) {
      const bookData = openLibraryResponse.data[`ISBN:${isbn}`];
      return {
        title: bookData.title,
        author: bookData.authors ? bookData.authors.map((a: any) => a.name).join(', ') : 'Unknown',
        description: bookData.notes || bookData.excerpts?.[0]?.text || '',
        cover: bookData.cover?.medium || bookData.cover?.large || bookData.cover?.small,
      };
    }
    
    // If Open Library doesn't have it, try Google Books API
    const googleBooksResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    
    if (googleBooksResponse.data.items && googleBooksResponse.data.items.length > 0) {
      const bookData = googleBooksResponse.data.items[0].volumeInfo;
      return {
        title: bookData.title,
        author: bookData.authors ? bookData.authors.join(', ') : 'Unknown',
        description: bookData.description || '',
        cover: bookData.imageLinks?.thumbnail,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return null;
  }
}
