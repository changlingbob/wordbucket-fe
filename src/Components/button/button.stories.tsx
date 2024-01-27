import * as React from 'react';

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = React.useState(0);

    return (
      <>
        <p>
          Test: <span data-testid="value">{value}</span>
        </p>
        <Button
          data-testid="button"
          {...args}
          onClick={() => setValue(value + 1)}
        >
          Increment test
        </Button>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const value = await canvas.getByTestId('value');
    const button = await canvas.getByTestId('button');

    await button.click();
    await button.click();
    await button.click();
    await button.click();

    expect(await value.innerText).toBe('4');
  },
};

export default meta;
