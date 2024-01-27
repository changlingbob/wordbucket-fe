import * as React from 'react';

import { DebugState } from '@state/debugger';
import type { Meta, StoryObj } from '@storybook/react';
import { Word } from 'wordbucket';

import { WordEdit } from './wordEdit';

const meta: Meta<typeof WordEdit> = {
  title: 'WordEdit',
  component: WordEdit,
};

type Story = StoryObj<typeof WordEdit>;

export const Primary: Story = {
  args: {
    word: new Word('This is fixed text. ${$a} ${bucket.lookup}.', 1),
  },
  render: (args) => (
    <DebugState.Provider
      value={{
        add: () => {},
        clear: () => {},
        keys: { 'bucket.lookup': 'fake lookup' },
      }}
    >
      <WordEdit data-testid="wordEdit" {...args} />
    </DebugState.Provider>
  ),
};

export default meta;
