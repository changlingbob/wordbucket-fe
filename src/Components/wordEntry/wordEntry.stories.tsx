import * as React from 'react';

import { DebugState } from '@state/debugger';
import type { Meta, StoryObj } from '@storybook/react';
import { Word } from 'wordbucket';

import { WordEntry } from './wordEntry';

const meta: Meta<typeof WordEntry> = {
  title: 'WordEntry',
  component: WordEntry,
};

type Story = StoryObj<typeof WordEntry>;

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
      <WordEntry data-testid="wordEntry" {...args} />
    </DebugState.Provider>
  ),
};

export default meta;
