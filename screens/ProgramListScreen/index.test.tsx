import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ProgramListScene } from "./";
import { useFilterOrder } from "../../hooks/useFilterOrder";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../api/programs", () => ({
  fetchPrograms: jest.fn(),
}));

jest.mock("../../api/toggles", () => ({
  handleToggleFavoriteProgram: jest.fn(),
}));

jest.mock("../../hooks/useFilterOrder", () => ({
  useFilterOrder: jest.fn(),
}));

jest.mock("../../components/CustomSearchBar/CustomSearchBar", () => {
  const { TextInput } = jest.requireActual("react-native");
  return (props) => (
    <TextInput
      testID="search-bar"
      onChangeText={props.onChangeText}
      value={props.value}
    />
  );
});

jest.mock("../../components/FilterBar/FilterBar", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View>
      {props.filters.map((filter) => (
        <Text key={filter} onPress={() => props.onFilterChange(filter)}>
          {filter}
        </Text>
      ))}
    </View>
  );
});

jest.mock("../../components/ItemCard", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return (props) => (
    <TouchableOpacity testID="item-card" onPress={props.onPressNav}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

describe("ProgramListScene", () => {
  const mockNavigation = { push: jest.fn() };
  const mockRoute = { params: {} };

  beforeEach(() => {
    useFilterOrder.mockReturnValue({
      order: { field: "created_at", asc: false },
      handleFilterChange: jest.fn(),
      selectedFilter: "Plus récents",
      filterList: ["Plus récents", "Moins récents", "A-Z", "Z-A"],
    });
    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders the search bar, filter bar, and flatlist", () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ count: 0, data: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByTestId, getByText } = render(
      <ProgramListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Check if the search bar, filter bar, and item list are rendered
    expect(getByTestId("search-bar")).toBeTruthy();
    expect(getByText("Plus récents")).toBeTruthy();
    expect(getByText("Moins récents")).toBeTruthy();
    expect(getByText("A-Z")).toBeTruthy();
    expect(getByText("Z-A")).toBeTruthy();
  });

  it("fetches and displays programs", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 2,
            data: [
              { id: 1, title: "Program 1", favorite_programs: [] },
              { id: 2, title: "Program 2", favorite_programs: [{ id: 1 }] },
            ],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByText } = render(
      <ProgramListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Check if the programs are rendered
    await waitFor(() => {
      expect(getByText("Program 1")).toBeTruthy();
      expect(getByText("Program 2")).toBeTruthy();
    });
  });

  it("updates search query when typing in the search bar", async () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ count: 0, data: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <ProgramListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Simulate typing in the search bar
    fireEvent.changeText(getByTestId("search-bar"), "New Search");

    await waitFor(() => {
      expect(getByTestId("search-bar").props.value).toBe("New Search");
    });
  });

  it("fetches next page when onEndReached is triggered", () => {
    const fetchNextPageMock = jest.fn();

    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 1,
            data: [{ id: 1, title: "Program 1", favorite_programs: [] }],
            nextCursor: "next-cursor",
          },
        ],
      },
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <ProgramListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Trigger onEndReached
    fireEvent(getByTestId("flat-list"), "onEndReached");

    expect(fetchNextPageMock).toHaveBeenCalled();
  });

  it("navigates to the program detail screen when an item is pressed", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 1,
            data: [{ id: 1, title: "Program 1", favorite_programs: [] }],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByText } = render(
      <ProgramListScene navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText("Program 1"));

    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("ProgramDetailsScreen", {
        id: 1,
      });
    });
  });
});
