import { Box, Card, CardBody, CardFooter, CardHeader, CardProps, Grid, HStack, Heading, Link, Show, Stack, Text, chakra, useColorModeValue } from '@chakra-ui/react';
import { mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import NextLink from 'next/link';

export type GenericListData = CardProps & {
  title: string;
  subtitle: string;
  data: GenericListItem[];
  column?: number;
  overrideColor?: {
    light: string;
    dark: string;
  };
};

export type GenericListItem = {
  description: string;
  href: string;
  linkText: string;
  title: string;
  img: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
};

const CustomImage = chakra(Image, {
  shouldForwardProp: (prop) => ['height', 'width', 'quality', 'src', 'alt', 'fill'].includes(prop),
});

export const GenericList = (props: GenericListData) => {
  const cols = props.column || 4;
  const color = props.overrideColor != null ? useColorModeValue(props.overrideColor.light, props.overrideColor.light) : undefined;

  return (
    <Box>
      <Heading as="h2" pt={6} mb={8}>
        {props.title}
      </Heading>
      {props.subtitle != '' && (
        <Heading as="h3" size={'sm'} pb={6} mb={8}>
          {props.subtitle}
        </Heading>
      )}

      <Grid templateColumns={{ base: `repeat(2}, 1fr)`, md: `repeat(${cols / 2}, 1fr)`, lg: `repeat(${cols}, 1fr)` }} gap={6} alignItems={'items-stretch'}>
        {props.data.map((item, key) => (
          <Card key={key} background={'whiteAlpha.300'} backdropFilter={'blur(16px)'} color={color} width={props.width} mx={'auto'} direction={{ base: 'column', sm: 'row', md: 'column' }}>
            <CardHeader p={0}>
              <Box width={{ base: 'full', sm: '200px', md: '100%' }} height={{ base: '170', sm: 'full', md: '170' }} position={'relative'}>
                <Image fill alt="" src={item.img.src} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: 'contain' }} />
              </Box>
            </CardHeader>
            <CardBody padding={0}>
              <Stack direction={['column', 'row', 'column']} spacing={5} padding={{ base: 5, md: 0 }}>
                {/* // <Image src= alt={item.img.alt || ''} fill={true} style={{ width: 'auto', height: 'auto' }} /> */}

                <Box padding={5}>
                  <Heading as="h3" size="sm" mb={2}>
                    {item.title}
                  </Heading>
                  <Text>{item.description}</Text>

                  <Show below="lg">
                    <HStack as={'span'} mt={2}>
                      <Link as={NextLink} href={item.href} color={props.overrideColor != null ? color : 'primary'} fontWeight={'semibold'}>
                        {item.linkText}
                      </Link>
                      <Icon path={mdiArrowRight} size={0.8} />
                    </HStack>
                  </Show>
                </Box>
              </Stack>
            </CardBody>
            <CardFooter display={{ base: 'none', lg: 'block' }}>
              <HStack as={'span'} mt={2}>
                <Link as={NextLink} href={item.href} color={props.overrideColor != null ? color : 'primary'} fontWeight={'semibold'}>
                  {item.linkText}
                </Link>
                <Icon path={mdiArrowRight} size={0.8} />
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};
