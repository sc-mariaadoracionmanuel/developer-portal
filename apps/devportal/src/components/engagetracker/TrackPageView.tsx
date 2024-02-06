import { PageInfo } from '@/src/lib/interfaces/page-info';
import { INestedObject } from '@sitecore/engage/types/lib/utils/flatten-object';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import { Product } from 'sc-changelog';
import { useEngageTracker } from 'ui/components/integrations';

interface TrackPageViewProps {
  children: React.ReactNode;
  pageInfo?: PageInfo | undefined;
  product?: Product | undefined;
  slug?: string;
}

export const TrackPageView: FC<TrackPageViewProps> = (props) => {
  const router = useRouter();
  const tracker = useEngageTracker();
  const prevUrlRef = useRef<string>();

  const callTrackPageView = async (url: string) => {
    if (tracker && tracker.context && tracker.context.isTrackerEnabled) {
      let slugPath = url;

      // If slug is provided, override the router slug
      if (props.slug) {
        slugPath = props.slug;
      }

      const additionalData: INestedObject = {};

      if (props.pageInfo?.product) {
        additionalData.product = props.pageInfo.product;
      }

      // To account for ChangeLog Product Pages
      if (props.product) {
        additionalData.product = props.product.name;
      }

      await tracker.TrackPageView(slugPath, additionalData);
    }
  };

  // Call on initial render
  useEffect(() => {
    callTrackPageView(router.asPath);
  }, []);

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (router.asPath !== prevUrlRef.current) {
        callTrackPageView(url);
        prevUrlRef.current = url;
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.asPath, tracker.context.isTrackerEnabled]);

  return <>{props.children}</>;
};
