import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import React from "react";
import { useQuery } from "../hooks/useQuery";
import { QueryFn } from "../types/api.types";
import { Button, Text } from "react-native";

const TestComponent = ({
  queryFn,
  args,
}: {
  queryFn: QueryFn<any>;
  args: any[];
}) => {
  const { data, loading, error, refetch } = useQuery(queryFn, ...args);
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <Text>Data: {JSON.stringify(data)}</Text>
      )}

      <Button onPress={() => refetch()} title="Refetch" />
    </>
  );
};

describe("useQuery", () => {
  it("should display data correctly", async () => {
    const mockQuery = jest.fn().mockResolvedValue({
      data: { id: 1, name: "Test Exercise" },
      error: null,
    });

    render(<TestComponent queryFn={mockQuery} args={[]} />);

    await waitFor(() =>
      expect(
        screen.getByText(/Data: {"id":1,"name":"Test Exercise"}/)
      ).toBeTruthy()
    );
  });

  it("should display loading state initially", () => {
    const mockQuery = jest.fn().mockReturnValue(new Promise(() => {}));

    render(<TestComponent queryFn={mockQuery} args={[]} />);

    expect(screen.getByText(/Loading.../)).toBeTruthy();
  });

  it("should handle errors correctly", async () => {
    const mockQuery = jest.fn().mockResolvedValue({
      data: null,
      error: new Error("Test Error"),
    });

    render(<TestComponent queryFn={mockQuery} args={[]} />);

    await waitFor(() =>
      expect(screen.getByText(/Error: Test Error/)).toBeTruthy()
    );
  });

  it("should refetch data", async () => {
    const mockQuery = jest
      .fn()
      .mockResolvedValueOnce({
        data: { id: 1, name: "Initial Data" },
        error: null,
      })
      .mockResolvedValueOnce({
        data: { id: 2, name: "Refetched Data" },
        error: null,
      });

    render(<TestComponent queryFn={mockQuery} args={[]} />);

    await waitFor(() =>
      expect(
        screen.getByText(/Data: {"id":1,"name":"Initial Data"}/)
      ).toBeTruthy()
    );

    fireEvent.press(screen.getByText(/Refetch/));

    await waitFor(
      () =>
        expect(screen.getByText(/Data: {"id":2,"name":"Refetched Data"}/))
          .toBeTruthy
    );
  });
});
