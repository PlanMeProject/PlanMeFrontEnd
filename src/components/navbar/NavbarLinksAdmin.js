
import {
    Avatar,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import {SearchBar} from 'components/navbar/searchBar/SearchBar';
import {SidebarResponsive} from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';

import routes from 'routes.js';
import {useHistory} from "react-router-dom";

export default function HeaderLinks(props) {

    const handleSearchChange = (query) => {
        removeHighlights();
        if (!query) {
            // If the query is empty, don't perform any search
            return;
        }

        // Highlight matching text
        highlightText(query);
    };

    const highlightText = (query) => {
        const body = document.body;
        const regex = new RegExp(query, 'gi');
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);

        let node;
        while ((node = walker.nextNode())) {
            const matches = node.nodeValue.match(regex);
            if (matches) {
                const span = document.createElement('span');
                span.className = 'highlight';
                const highlightedText = node.nodeValue.replace(regex, (match) => `<mark style="background-color: yellow; color: black;">${match}</mark>`);
                span.innerHTML = highlightedText;
                node.parentNode.replaceChild(span, node);
            }
        }
    };


    const removeHighlights = () => {
        document.querySelectorAll('.highlight').forEach((highlight) => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    };

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('selectedSubjects');
        history.push('/auth/sign-in');
    }

    const {secondary} = props;
    // Chakra Color Mode
    // const navbarIcon = useColorModeValue('gray.400', 'white');
    let menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    // const textColorBrand = useColorModeValue('brand.700', 'brand.400');
    // const ethColor = useColorModeValue('gray.700', 'white');
    const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
    // const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
    // const ethBox = useColorModeValue('white', 'navy.800');
    const shadow = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
    );
    // const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
    return (
        <Flex
            w={{sm: '100%', md: 'auto'}}
            alignItems="center"
            flexDirection="row"
            bg={menuBg}
            flexWrap={secondary ? {base: 'wrap', md: 'nowrap'} : 'unset'}
            p="10px"
            borderRadius="30px"
            boxShadow={shadow}>

            <SearchBar mb={secondary ? {base: '10px', md: 'unset'} : 'unset'}
                       me="10px" borderRadius="30px"
                       onSearchChange={handleSearchChange}
            />


            <SidebarResponsive routes={routes}/>

            {/*<ThemeEditor navbarIcon={navbarIcon}/>*/}

            <Menu>
                <MenuButton p="0px">
                    <Avatar
                        _hover={{cursor: 'pointer'}}
                        color="white"
                        name={props.name.toString().replace(".", " ")}
                        // src="https://bit.ly/broken-link"
                        bg="#11047A"
                        size="sm"
                        w="40px"
                        h="40px"
                    />
                </MenuButton>
                <MenuList boxShadow={shadow} p="0px" mt="10px"
                          borderRadius="20px" bg={menuBg} border="none">
                    <Flex w="100%" mb="0px">
                        <Text
                            ps="20px"
                            pt="16px"
                            pb="10px"
                            w="100%"
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            fontSize="sm"
                            fontWeight="700"
                            color={textColor}>
                            👋&nbsp; {props.name}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" p="10px">
                        <MenuItem onClick={handleLogout}
                            _hover={{bg: 'none'}}
                            _focus={{bg: 'none'}}
                            color="red.400"
                            borderRadius="8px"
                            px="14px">
                            <Text fontSize="sm">Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
    name: PropTypes.string,
};
