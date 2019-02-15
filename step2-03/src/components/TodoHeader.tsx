import React from 'react';
import { Text } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';
import { Pivot, PivotItem, TextField, DefaultButton } from 'office-ui-fabric-react';
import { FilterTypes } from '../store';

interface TodoHeaderProps {
  addTodo: (label: string) => void;
  setFilter: (filter: FilterTypes) => void;
  filter: string;
}

interface TodoHeaderState {
  labelInput: string;
}

export class TodoHeader extends React.Component<TodoHeaderProps, TodoHeaderState> {
  constructor(props: TodoHeaderProps) {
    super(props);
    this.state = { labelInput: undefined };
  }

  render() {
    return (
      <Stack>
        <Stack horizontal horizontalAlign="center">
          <Text variant="xxLarge">todos</Text>
        </Stack>

        <Stack horizontal>
          <Stack.Item grow>
            <TextField placeholder="What needs to be done?" value={this.state.labelInput} onChange={this.onChange} />
          </Stack.Item>
          <DefaultButton onClick={this.onAdd}>Add</DefaultButton>
        </Stack>

        <Pivot onLinkClick={this.onFilter}>
          <PivotItem headerText="all" />
          <PivotItem headerText="active" />
          <PivotItem headerText="completed" />
        </Pivot>
      </Stack>
    );
  }

  private onAdd = () => {
    this.props.addTodo(this.state.labelInput);
    this.setState({ labelInput: undefined });
  };

  private onChange = (evt: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ labelInput: newValue });
  };

  private onFilter = (item: PivotItem) => {
    this.props.setFilter(item.props.headerText as FilterTypes);
  };
}