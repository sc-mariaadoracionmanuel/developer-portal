import ChangelogSearchResults from '@/src/components/changelog/search/ChangelogSearchResults';
import { Alert, AlertIcon, Grid, GridItem, HStack, Hide, Text, Tooltip } from '@chakra-ui/react';
import { mdiRss } from '@mdi/js';
import Icon from '@mdi/react';
import { getUserId } from '@sitecore-search/react';
import Layout from '@src/layouts/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchChangeLog, { SearchChangeLogParams } from 'sc-changelog/search';
import { ChangeLogSearchFacet } from 'sc-changelog/search/types';
import { ChangelogEntry } from 'sc-changelog/types/changeLogEntry';
import Hero from 'ui/components/common/Hero';
import ProductLogo from 'ui/components/common/ProductLogo';
import { CenteredContent, VerticalGroup } from 'ui/components/helpers';
import { ButtonLink } from 'ui/components/links/ButtonLink';
import { Product } from 'ui/lib/assets';

export default function ChangeSearchlogHome() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [facets, setFacets] = useState<ChangeLogSearchFacet[]>([]);
  const limit = 10;
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const uuid = getUserId().uuid;
  const router = useRouter();

  const loadEntries = async () => {
    const searchChangeLogParams: SearchChangeLogParams = {
      path: router.pathname,
      limit: limit,
      offset: offset,
      uuid: uuid,
    };

    const apiResponse = await SearchChangeLog(searchChangeLogParams);
    const newEntries = entries.concat((await SearchChangeLog(searchChangeLogParams)).entries);
    setEntries(newEntries);
    setFacets(apiResponse.facets);

    setOffset(offset + limit);
    setisLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" href="/api/changelog/v1/all?" as="fetch" crossOrigin="anonymous" />
      </Head>
      <Layout title="Sitecore's global changelog" description="Learn more about new versions, changes and improvements">
        <Hero title="Changelog" description="Learn more about new versions, changes and improvements">
          <HStack>
            <Text variant={'sm'}>Powered by</Text>
            <Link href="/content-management/content-hub-one" title="Visit the Content Hub ONE product page to learn more">
              <ProductLogo product={Product.ContentHubOne} width={140} height={18} />
            </Link>
            <Text variant={'sm'}>and</Text>
            <Link href="/content-management/search" title="Visit the Sitecore Search product page to learn more">
              <ProductLogo product={Product.Search} width={66} height={18} />
            </Link>
          </HStack>
        </Hero>

        <VerticalGroup>
          <CenteredContent py={8} gap={8}>
            <Alert status="info" alignItems="center">
              <AlertIcon />
              <Tooltip label="Go to the overview of current release notes" aria-label="A tooltip">
                <Link href="/changelog/current" title="View the list of current release notes per product">
                  You are viewing the public preview of the upcoming Sitecore global changelog.
                </Link>
              </Tooltip>
            </Alert>
            <Grid templateColumns="repeat(5, 1fr)" gap={14}>
              <GridItem colSpan={{ base: 5, md: 3 }}>
                <ChangelogSearchResults entries={entries} facets={facets} isLoading={isLoading} loadEntries={() => loadEntries()} />
              </GridItem>
              <Hide below="md">
                <GridItem colSpan={{ base: 2 }}>
                  <ButtonLink text={'RSS'} href={`${router.pathname}/rss.xml`} variant={'ghost'} leftIcon={<Icon path={mdiRss} size={1} />} rightIcon={undefined} />
                  <ButtonLink text={'ATOM'} href={`${router.pathname}/atom.xml`} variant={'ghost'} leftIcon={<Icon path={mdiRss} size={1} />} rightIcon={undefined} />
                  <p>Changes by month will appear in here!</p>
                </GridItem>
              </Hide>
            </Grid>
          </CenteredContent>
        </VerticalGroup>
      </Layout>
    </>
  );
}
