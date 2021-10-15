import {
  ContextualMenuItemType,
  IconButton,
  IContextualMenuProps,
  INavLinkGroup,
  INavStyles,
  Nav,
  Stack,
  Text,
} from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { useAuth } from '@raftlabs/hbp-react';
import { ILayoutProvider, PageLoader, useResource } from '@raftlabs/nx-admin';
import React from 'react';
import { auth } from '../helpers/hbp-helper';

const MainLayout = ({ children, resources }: ILayoutProvider) => {
  const { name, resourceRoutes, loading } = useResource();
  const { user, signedIn } = useAuth();
  console.log(signedIn);

  const navStyles: Partial<INavStyles> = {
    root: {
      minHeight: 'calc(100vh - 70px)',
      paddingTop: 5,
      boxSizing: 'border-box',
      border: '1px solid #eee',
      overflowY: 'auto',
      width: 300,
    },
  };

  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    items: [
      {
        key: 'Admin',
        itemType: ContextualMenuItemType.Header,
        text: user?.display_name,
        itemProps: { lang: 'en-us' },
        iconProps: { iconName: 'Contact' },
      },

      {
        key: 'Logout',
        iconProps: { iconName: 'SignOut' },
        text: 'Logout',
        onClick: () => {
          auth.logout();
        },
      },
    ],
  }));
  const navLinkGroups: INavLinkGroup[] = resourceRoutes;
  return (
    <Stack verticalFill>
      <Stack.Item>
        <Stack
          horizontal
          verticalFill
          horizontalAlign="space-between"
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          styles={{ root: { backgroundColor: '#ccc', height: 70 } }}
        >
          <Stack.Item>
            <Stack horizontal verticalAlign="center">
              <Stack.Item>
                <Text
                  block
                  variant="xxLargePlus"
                  styles={{ root: { padding: 10 } }}
                >
                  Nx Admin
                </Text>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal verticalAlign="center">
              <Stack.Item>
                <IconButton
                  styles={{
                    root: {
                      padding: 10,
                    },
                    rootHovered: {
                      backgroundColor: 'transparent',
                    },
                    rootPressed: {
                      backgroundColor: 'transparent',
                    },
                    rootExpanded: {
                      backgroundColor: 'transparent',
                    },
                  }}
                  menuProps={menuProps}
                  iconProps={{
                    iconName: 'Contact',
                    styles: {
                      root: {
                        width: 20,
                        height: 20,
                        backgroundColor: '#fff',
                        padding: 5,
                        borderRadius: '100%',
                      },
                    },
                  }}
                ></IconButton>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <Stack horizontal>
          <Stack.Item>
            <Nav
              styles={navStyles}
              ariaLabel="Resource Navigation bar"
              groups={navLinkGroups}
              selectedKey={name}
            />
          </Stack.Item>
          <Stack.Item grow>
            <Stack
              styles={{
                root: { padding: 20, background: '#fcfcfc', width: '100%' },
              }}
              verticalFill
              horizontal
            >
              {loading ? <PageLoader /> : children}
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default MainLayout;
