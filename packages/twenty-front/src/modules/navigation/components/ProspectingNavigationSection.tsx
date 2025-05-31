import { MAIN_CONTEXT_STORE_INSTANCE_ID } from '@/context-store/constants/MainContextStoreInstanceId';
import { contextStoreCurrentViewIdComponentState } from '@/context-store/states/contextStoreCurrentViewIdComponentState';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { prefetchViewsFromObjectMetadataItemFamilySelector } from '@/prefetch/states/selector/prefetchViewsFromObjectMetadataItemFamilySelector';
import { AppPath } from '@/types/AppPath';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerItemsCollapsableContainer } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItemsCollapsableContainer';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { NavigationDrawerSubItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSubItem';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { getNavigationSubItemLeftAdornment } from '@/ui/navigation/navigation-drawer/utils/getNavigationSubItemLeftAdornment';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
    IconBuildingSkyscraper,
    IconCheckbox,
    IconList,
    IconNotes,
    IconSettingsAutomation,
    IconTargetArrow,
    IconUser,
} from 'twenty-ui/display';
import { AnimatedExpandableContainer } from 'twenty-ui/layout';
import { getAppPath } from '~/utils/navigation/getAppPath';

const StyledNavigationDrawerSection = styled(NavigationDrawerSection)`
  transition: all 0.2s ease-in-out;
`;

const StyledNavigationDrawerItemsCollapsableContainer = styled(
  NavigationDrawerItemsCollapsableContainer,
)`
  transition: all 0.2s ease-in-out;
`;

const StyledAnimatedExpandableContainer = styled(AnimatedExpandableContainer)`
  transition: all 0.2s ease-in-out;
`;

type IconComponent = React.ComponentType<{ size?: number; stroke?: number }>;

interface NavigationItemProps {
  label: string;
  Icon: IconComponent;
  objectNamePlural: string;
}

const NavigationItemWithSubItems = ({
  label,
  Icon,
  objectNamePlural,
}: NavigationItemWithSubItemsProps) => {
  const location = useLocation();
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);
  const contextStoreCurrentViewId = useRecoilComponentValueV2(
    contextStoreCurrentViewIdComponentState,
    MAIN_CONTEXT_STORE_INSTANCE_ID,
  );

  const objectMetadataItem = useMemo(
    () =>
      objectMetadataItems.find((item) => item.namePlural === objectNamePlural),
    [objectMetadataItems, objectNamePlural],
  );

  const views = useRecoilValue(
    prefetchViewsFromObjectMetadataItemFamilySelector({
      objectMetadataItemId: objectMetadataItem?.id ?? '',
    }),
  );

  if (!objectMetadataItem) {
    console.warn(`No metadata found for ${objectNamePlural}`);
    return null;
  }

  const basePath = useMemo(
    () =>
      getAppPath(AppPath.RecordIndexPage, {
        objectNamePlural,
      }),
    [objectNamePlural],
  );

  const isItemActive = useMemo(
    () =>
      location.pathname === basePath ||
      views.some(
        (view) =>
          location.pathname ===
          getAppPath(
            AppPath.RecordIndexPage,
            {
              objectNamePlural,
            },
            { viewId: view.id },
          ),
      ),
    [location.pathname, basePath, views, objectNamePlural],
  );

  const sortedViews = useMemo(
    () => [...views].sort((viewA, viewB) => viewA.position - viewB.position),
    [views],
  );

  // Filter out the third view for opportunities
  const filteredViews = useMemo(
    () =>
      objectNamePlural === 'opportunities'
        ? sortedViews.slice(0, 2)
        : sortedViews,
    [objectNamePlural, sortedViews],
  );

  const selectedSubItemIndex = useMemo(
    () =>
      filteredViews.findIndex((view) => contextStoreCurrentViewId === view.id),
    [filteredViews, contextStoreCurrentViewId],
  );

  if (filteredViews.length === 0) {
    return (
      <NavigationDrawerItem
        label={label}
        Icon={Icon}
        active={isItemActive}
        to={basePath}
        aria-label={`${label} (No views available)`}
      />
    );
  }

  return (
    <StyledNavigationDrawerItemsCollapsableContainer
      isGroup={isItemActive}
      aria-label={`${label} navigation group`}
    >
      <NavigationDrawerItem
        label={label}
        Icon={Icon}
        active={isItemActive}
        to={basePath}
        aria-label={`${label} main view`}
      />
      <StyledAnimatedExpandableContainer
        isExpanded={isItemActive}
        dimension="height"
        mode="fit-content"
        containAnimation
        aria-label={`${label} sub-items`}
      >
        {filteredViews.map((view, index) => (
          <NavigationDrawerSubItem
            key={view.id}
            label={
              objectNamePlural === 'opportunities' && index === 0
                ? 'Leads'
                : objectNamePlural === 'opportunities' && index === 1
                  ? 'Sales Pipeline'
                  : view.name
            }
            to={getAppPath(
              AppPath.RecordIndexPage,
              {
                objectNamePlural,
              },
              { viewId: view.id },
            )}
            active={contextStoreCurrentViewId === view.id}
            subItemState={getNavigationSubItemLeftAdornment({
              index,
              arrayLength: filteredViews.length,
              selectedIndex: selectedSubItemIndex,
            })}
            Icon={Icon}
            aria-label={`${view.name} view`}
          />
        ))}
      </StyledAnimatedExpandableContainer>
    </StyledNavigationDrawerItemsCollapsableContainer>
  );
};

const NavigationSingleItem = ({
  label,
  Icon,
  objectNamePlural,
}: NavigationSingleItemProps) => {
  const location = useLocation();
  const path = useMemo(
    () =>
      getAppPath(AppPath.RecordIndexPage, {
        objectNamePlural,
      }),
    [objectNamePlural],
  );

  return (
    <NavigationDrawerItem
      label={label}
      Icon={Icon}
      active={location.pathname === path}
      to={path}
      aria-label={`${label} navigation item`}
    />
  );
};

export const ProspectingNavigationSection = () => {
  const { t } = useLingui();

  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection('Prospecting');
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  return (
    <StyledNavigationDrawerSection aria-label="Prospecting section">
      <NavigationDrawerSectionTitle
        label={t`Prospecting`}
        onClick={toggleNavigationSection}
        aria-label="Toggle prospecting section"
      />
      {isNavigationSectionOpen && (
        <>
          <NavigationSingleItem
            label={t`Contacts`}
            Icon={IconUser}
            objectNamePlural="people"
          />
          <NavigationSingleItem
            label={t`Companies`}
            Icon={IconBuildingSkyscraper}
            objectNamePlural="companies"
          />
          <NavigationItemWithSubItems
            label={t`Opportunities`}
            Icon={IconTargetArrow}
            objectNamePlural="opportunities"
          />
          <NavigationItemWithSubItems
            label={t`Tasks`}
            Icon={IconCheckbox}
            objectNamePlural="tasks"
          />
          <NavigationSingleItem
            label={t`Notes`}
            Icon={IconNotes}
            objectNamePlural="notes"
          />
          <NavigationSingleItem
            label={t`Survey Results`}
            Icon={IconList}
            objectNamePlural="survey-results"
          />
          <NavigationSingleItem
            label={t`Workflows`}
            Icon={IconSettingsAutomation}
            objectNamePlural="workflows"
          />
        </>
      )}
    </StyledNavigationDrawerSection>
  );
};
