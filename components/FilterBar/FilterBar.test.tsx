import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FilterBar from './FilterBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe('FilterBar', () => {
  const filters = ["Plus récents", "Moins récents", "A-Z", "Z-A"];
  const defaultFilter = "Plus récents";
  const resultsCount = 15;

  it('renders with correct number of results', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar resultsCount={resultsCount} />
      </Wrapper>
    );
    expect(getByText(`${resultsCount} résultats`)).toBeTruthy();
  });

  it('renders with the default filter text', () => {
    const { getByText } = render(
      <Wrapper>
        <FilterBar defaultFilter={defaultFilter} />
      </Wrapper>
    );
    expect(getByText(defaultFilter)).toBeTruthy();
  });

  it('opens the menu when the filter button is pressed', () => {
    const { getByTestId, getByText } = render(
      <Wrapper>
        <FilterBar filters={filters} />
      </Wrapper>
    );

    expect(() => getByText('A-Z')).toThrow();

    fireEvent.press(getByTestId('filter-button'));

    expect(getByText('A-Z')).toBeTruthy();
  });

  it('closes the menu when a filter option is selected', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Wrapper>
        <FilterBar filters={filters} />
      </Wrapper>
    );
  
    fireEvent.press(getByTestId('filter-button'));
  
    expect(getByText('A-Z')).toBeTruthy();

    fireEvent.press(getByText('A-Z'));
  
    await waitFor(() => expect(queryByTestId('filter-button')).toBeTruthy());
  });
  
  it('changes the filter text when an option is selected', async () => {
    const { getByTestId, getByText } = render(
      <Wrapper>
        <FilterBar filters={filters} />
      </Wrapper>
    );


    fireEvent.press(getByTestId('filter-button'));
    fireEvent.press(getByText('Z-A'));

    await waitFor(() => {
      expect(getByText('Z-A')).toBeTruthy();
    });
  });

  it('calls the onFilterChange callback when a filter option is selected', async () => {
    const mockOnFilterChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Wrapper>
        <FilterBar filters={filters} onFilterChange={mockOnFilterChange} />
      </Wrapper>
    );

    fireEvent.press(getByTestId('filter-button'));
    fireEvent.press(getByText('A-Z'));

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith('A-Z');
    });
  });

  it('renders with the default filter if no defaultFilter prop is provided', () => {
    const { getByTestId } = render(
      <Wrapper>
        <FilterBar />
      </Wrapper>
    );

    expect(getByTestId('filter-text').children[0]).toBe('Plus récents');
  });

  it('renders all filter options in the menu', () => {
    const filters = ['Plus récents', 'Moins récents', 'A-Z', 'Z-A'];
    const { getByTestId, getByText } = render(
      <Wrapper>
        <FilterBar filters={filters} />
      </Wrapper>
    );
  
    fireEvent.press(getByTestId('filter-button'));
  
    filters.forEach((filterOption) => {
      const testId = `menu-item-${filterOption.replace(/\s+/g, '-').toLowerCase()}`;
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
  
});
