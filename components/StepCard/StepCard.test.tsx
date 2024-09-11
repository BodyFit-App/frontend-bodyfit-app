import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StepCard from "./StepCard";

describe("StepCard Component", () => {
  const mockDelete = jest.fn();
  const mockValidate = jest.fn();

  const editableProps = {
    stepNumber: 1,
    description: "Ceci est la description de l'étape 1.",
    isEditable: true,
    onDelete: mockDelete,
  };

  const nonEditableProps = {
    stepNumber: 2,
    totalSteps: 4,
    description: "Ceci est la description de l'étape 2 sur 4.",
    isEditable: false,
    isValidated: false,
    onValidate: mockValidate,
  };

  const validatedProps = {
    ...nonEditableProps,
    isValidated: true,
  };

  it("renders the correct information in editable mode", () => {
    const { getByText, getByRole } = render(<StepCard {...editableProps} />);

    expect(getByText("Étape 1")).toBeTruthy();
    expect(getByText("Ceci est la description de l'étape 1.")).toBeTruthy();
    expect(getByRole("button")).toBeTruthy();
  });

  it("calls onDelete when the delete button is pressed", () => {
    const { getByRole } = render(<StepCard {...editableProps} />);

    fireEvent.press(getByRole("button"));

    expect(mockDelete).toHaveBeenCalled();
  });

  it("renders the correct information in validation mode (not validated)", () => {
    const { getByText, getByRole } = render(<StepCard {...nonEditableProps} />);

    expect(getByText("Étape 2 sur 4")).toBeTruthy();

    expect(
      getByText("Ceci est la description de l'étape 2 sur 4.")
    ).toBeTruthy();

    expect(getByRole("button")).toBeTruthy();
  });

  it("calls onValidate when the validate button is pressed", () => {
    const { getByRole } = render(<StepCard {...nonEditableProps} />);

    fireEvent.press(getByRole("button"));

    expect(mockValidate).toHaveBeenCalled();
  });

  it("renders the correct check icon when the step is validated", () => {
    const { getByTestId } = render(<StepCard {...validatedProps} />);

    expect(getByTestId("check")).toBeTruthy();
  });

  it('renders the correct check-outline icon when the step is not validated', () => {
    const { getByTestId } = render(
      <StepCard 
        stepNumber={2} 
        totalSteps={4} 
        description="Étape de test" 
        isEditable={false} 
        isValidated={false} 
        onValidate={jest.fn()} 
      />
    );
  
    expect(getByTestId('check-outline')).toBeTruthy();
  });

  it('renders the correct check icon when the step is validated', () => {
    const { getByTestId } = render(
      <StepCard 
        stepNumber={2} 
        totalSteps={4} 
        description="Étape de test validée" 
        isEditable={false} 
        isValidated={true} 
        onValidate={jest.fn()} 
      />
    );
  
    expect(getByTestId('check')).toBeTruthy();
  });

  it('renders the delete button when isEditable is true', () => {
    const { getByTestId } = render(
      <StepCard 
        stepNumber={1} 
        description="Ceci est une étape éditable" 
        isEditable={true} 
        onDelete={jest.fn()} 
      />
    );
  

    expect(getByTestId('delete-button')).toBeTruthy();
  });

  it('renders check-outline when isValidated is false and isEditable is false', () => {
    const { getByTestId } = render(
      <StepCard 
        stepNumber={2} 
        totalSteps={4} 
        description="Ceci est une étape de validation non validée" 
        isEditable={false} 
        isValidated={false} 
        onValidate={jest.fn()} 
      />
    );
  

    expect(getByTestId('check-outline')).toBeTruthy();
  });
    
  it('renders check when isValidated is true and isEditable is false', () => {
    const { getByTestId } = render(
      <StepCard 
        stepNumber={2} 
        totalSteps={4} 
        description="Ceci est une étape validée" 
        isEditable={false} 
        isValidated={true} 
        onValidate={jest.fn()} 
      />
    );
  

    expect(getByTestId('check')).toBeTruthy();
  });
  
  
  
  
  
});
