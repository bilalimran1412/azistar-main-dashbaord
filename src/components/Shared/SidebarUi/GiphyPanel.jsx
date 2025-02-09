import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Input,
  Image,
  Grid,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  InputLeftElement,
  Container,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const GiphySearchGrid = ({ onSelect }) => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGif, setSelectedGif] = useState(null);
  const observer = useRef(null);

  const fetchGifs = useCallback(async (searchQuery = '', newOffset = 0) => {
    if (searchQuery.length < 3) {
      setGifs([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchQuery}&limit=20&offset=${newOffset}`
      );
      const data = await response.json();
      const newGifs = data.data;
      setGifs((prevGifs) =>
        newOffset === 0 ? newGifs : [...prevGifs, ...newGifs]
      );
      setHasMore(newGifs.length > 0);
      setOffset(newOffset);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (value) => {
      const timer = setTimeout(() => {
        if (value.length >= 3) {
          setOffset(0);
          fetchGifs(value, 0);
        }
      }, 500);

      return () => clearTimeout(timer);
    },
    [fetchGifs]
  );

  const lastGifElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGifs(query, offset + 20);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, query, offset, fetchGifs]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleGifClick = (gif) => {
    setSelectedGif(gif.id);
    onSelect(gif);
  };

  return (
    <Container py={6} maxHeight='500px' overflow='auto'>
      <Box mb={6}>
        <InputGroup size='lg'>
          <InputLeftElement pointerEvents='none' paddingRight={4}>
            <SearchIcon color='gray.400' />
          </InputLeftElement>
          <Input
            placeholder='Search GIFs (minimum 3 characters)...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant='custom'
            paddingLeft={8}
          />
        </InputGroup>
      </Box>

      {query.length > 0 && query.length < 3 && (
        <Alert status='info' borderRadius='md' mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>Please enter at least 3 characters</AlertTitle>
            <AlertDescription>
              Your search will begin automatically once you type more
              characters.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Box>
        <Grid templateColumns='repeat(3, 1fr)' gap={4}>
          {gifs.map((gif, index) => (
            <Box
              key={gif.id}
              ref={gifs.length === index + 1 ? lastGifElementRef : null}
              position='relative'
              borderRadius='lg'
              overflow='hidden'
              boxShadow='md'
              transition='transform 0.2s'
              _hover={{ transform: 'scale(1.05)' }}
              border={selectedGif === gif.id ? '3px solid #38B2AC' : 'none'}
              cursor='pointer'
              onClick={() => handleGifClick(gif)}
            >
              <Box position='relative' paddingTop='100%'>
                <Image
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  position='absolute'
                  top='0'
                  left='0'
                  w='100%'
                  h='100%'
                  objectFit='cover'
                  loading='lazy'
                />
              </Box>
            </Box>
          ))}
        </Grid>

        {loading && (
          <Box textAlign='center' my={6}>
            <Spinner size='xl' color='blue.500' thickness='4px' />
          </Box>
        )}

        {!hasMore && !loading && gifs.length > 0 && (
          <Text textAlign='center' fontWeight='bold' my={6} color='gray.600'>
            No more GIFs to load.
          </Text>
        )}

        {!loading && gifs.length === 0 && query.length >= 3 && (
          <Alert status='info' borderRadius='md' mt={4}>
            <AlertIcon />
            <Box>
              <AlertTitle>No results found</AlertTitle>
              <AlertDescription>
                No GIFs found for "{query}". Try a different search!
              </AlertDescription>
            </Box>
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default GiphySearchGrid;
