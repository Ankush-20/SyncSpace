import React, { Suspense, useState } from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Button, Link, HStack } from '@chakra-ui/react';
import {
  Portal,
  Box,
  useDisclosure,
  Flex,
  Spinner,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes.js';

export default function Dashboard(props) {
  const { ...rest } = props;

  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { onOpen } = useDisclosure();

  // Determine if current route is full-screen maps page
  const getRoute = () => window.location.pathname !== '/admin/full-screen-maps';

  // Helper functions to find active route and navbar info from routes config
  const getActiveRoute = (routes) => {
    let activeRoute = 'Dashboard';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) return collapseActiveRoute;
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) return categoryActiveRoute;
      } else {
        if (
          window.location.href.indexOf(
            routes[i].both === true
              ? routes[i].path.replace('/:id', '')
              : routes[i].layout + routes[i].path.replace('/:id', '')
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const under = (routes) => {
    let activeRoute = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) return collapseActiveRoute;
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) return categoryActiveRoute;
      } else {
        if (
          window.location.href.indexOf(
            routes[i].layout + routes[i].path.replace('/:id', '')
          ) !== -1
        ) {
          return routes[i];
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) return collapseActiveNavbar;
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) return categoryActiveNavbar;
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) return collapseActiveNavbar;
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) return categoryActiveNavbar;
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  // Map routes to Route components
  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (!prop.under && prop.layout === '/admin') {
        return (
          <Route
            path={prop.both === true ? prop.path : prop.layout + prop.path}
            element={<prop.component />}
            key={key}
          />
        );
      } else if (prop.under) {
        return (
          <Route path={prop.layout + prop.path} element={<prop.component />} key={key} />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      }
      return null;
    });

  document.documentElement.dir = 'ltr';

  // Colors for backgrounds
  const mainBg = useColorModeValue('gray.50', 'gray.900');
  const contentBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" bg={mainBg}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        {/* Sidebar */}
        <Sidebar routes={routes} display={{ base: 'none', xl: 'block' }} {...rest} />

        {/* Main content area */}
        <Box
          ml={{ base: 0, xl: '290px' }}
          transition="margin-left 0.3s ease"
          minHeight="100vh"
          bg={contentBg}
          borderLeft="1px solid"
          borderColor={borderColor}
          display="flex"
          flexDirection="column"
        >
          {/* Navbar fixed to top */}
          <Portal>
            <Box position="sticky" top="0" zIndex="overlay" boxShadow="sm" bg={contentBg}>
              <Navbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                under={under(routes)}
                {...rest}
              />
              <Divider />
            </Box>
          </Portal>

          {/* Page content with padding and maxWidth */}
          <Box
            flex="1"
            mx="auto"
            maxW="1200px"
            px={{ base: '4', md: '6', lg: '8' }}
            pt={{ base: '140px', md: '100px', xl: '100px' }}
            pb="10"
            minHeight="calc(100vh - 150px)" // leave space for footer
          >
            {/* Breadcrumb or page title */}
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb="6"
              color={useColorModeValue('gray.700', 'gray.200')}
              userSelect="none"
            >
              {getActiveRoute(routes)}
            </Text>
            <HStack spacing={4} mb={6}>
  <Link href="https://www.instagram.com/captures.thread/" isExternal>
    <Button leftIcon={<FaInstagram />} colorScheme="pink" variant="outline" size="sm">
      Instagram
    </Button>
  </Link>
  <Link href="https://www.facebook.com/sabby.randhawa/" isExternal>
    <Button leftIcon={<FaFacebook />} colorScheme="facebook" variant="outline" size="sm">
      Facebook
    </Button>
  </Link>
</HStack>

            {/* Suspense for route loading */}
            <Suspense
              fallback={
                <Flex justifyContent="center" alignItems="center" width="100%" height="60vh">
                  <Spinner size="xl" />
                </Flex>
              }
            >
              <Routes>
                {getRoutes(routes)}
                <Route path="/*" element={<Navigate to="/admin/default" />} />
              </Routes>
            </Suspense>
          </Box>

          {/* Footer */}
          <Box
            borderTop="1px solid"
            borderColor={borderColor}
            py="4"
            px={{ base: '4', md: '6', lg: '8' }}
            bg={contentBg}
            boxShadow="inner"
          >
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
