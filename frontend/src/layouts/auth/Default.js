// Chakra imports
import {Box, Flex} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import image from "../../assets/img/3dplanme.png";

function AuthIllustration(props) {
    const {children} = props;
    // Chakra color mode
    return (
        <Flex position='relative' h='max-content'>
            <Flex
                h={{
                    sm: "initial",
                    md: "unset",
                    lg: "100vh",
                    xl: "97vh",
                }}
                w='100%'
                maxW={{md: "66%", lg: "1313px"}}
                mx='auto'
                pt={{sm: "50px", md: "0px"}}
                px={{lg: "30px", xl: "0px"}}
                ps={{xl: "70px"}}
                justifyContent='start'
                direction='column'>
                {children}

                <Box
                    display={{base: "none", md: "block"}}
                    h='100%'
                    minH='100vh'
                    w={{lg: "50vw", "2xl": "44vw"}}
                    position='absolute'
                    right='0px'>
                    <Flex
                        bg='transparent'
                        justify='center'
                        align='flex-start'
                        w='100%'
                        h='100%'
                        bgSize='cover'
                        bgPosition='50%'
                        position='absolute'
                        borderBottomLeftRadius={{
                            lg: "120px",
                            xl: "200px"
                        }}>
                        <img src={image}
                             alt='illustration'
                             style={{
                                 width: '100%',
                                 objectFit: 'cover',
                                 position: 'absolute',
                             }}/>
                    </Flex>
                </Box>
            </Flex>
            <FixedPlugin/>
        </Flex>
    );
}

// PROPS

AuthIllustration.propTypes = {
    illustrationBackground: PropTypes.string,
    image: PropTypes.any,
};

export default AuthIllustration;
