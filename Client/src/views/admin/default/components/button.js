import { Button, Link, Icon } from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
return (
     <Box>          
<Button
  as={Link}
  href="https://instagram.com"
  target="_blank"
  leftIcon={<Icon as={FaInstagram} />}
  colorScheme="pink"
  mt={4}
>
  Visit Instagram
</Button>
<Button
    as={Link}
    href="https://twitter.com"
    target="_blank"
    leftIcon={<Icon as={FiTwitter} />}
    colorScheme="twitter"
    mt={4}
>
    Visit Twitter
</Button>
<Button
    as={Link}
    href="https://facebook.com"
    target="_blank"
    leftIcon={<Icon as={FaFacebookF} />}
    colorScheme="facebook"
    mt={4}
>
    Visit Facebook
</Button>
<Button
    as={Link}
    href="https://linkedin.com"
    target="_blank"
    leftIcon={<Icon as={FaLinkedinIn} />}
    colorScheme="linkedin"
    mt={4}
    >  
    </Button>
<Button
    as={Link}
    href="https://pinterest.com"
    target="_blank"
    leftIcon={<Icon as={FaPinterestP} />}
    colorScheme="pink"
    mt={4}
>
    Visit Pinterest
</Button>   
<Button
    as={Link}
    href="https://youtube.com"
    target="_blank"
    leftIcon={<Icon as={FaYoutube} />}
    colorScheme="red"
    mt={4}
>
    Visit YouTube
</Button>
<Button
    as={Link}
    href="https://github.com"
    target="_blank"
    leftIcon={<Icon as={FaGithub} />}   
    colorScheme="gray"
    mt={4}
>
    Visit GitHub
</Button>
</Box>
);      