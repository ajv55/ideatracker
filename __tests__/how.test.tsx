import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import How from "@/app/components/mainPage/how";


describe('How Component', () => {

    it('should render the How It Works section with the correct content', () => {

        render(<How />);

        //Check if the section heading is in the document
        const heading = screen.getByRole('heading', {level: 2});
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('How It Works');

        //Check if the second step is in the document 
        const step2Heading = screen.getByRole('heading', {name: 'Expand with OpenAI'});
        expect(step2Heading).toBeInTheDocument();
        const step2Description = screen.getByText('Let OpenAI analyze and suggest expansions, giving your ideas more depth and clarity.');
        expect(step2Description).toBeInTheDocument();

        //Check if the third step is in the document
        const step3Heading = screen.getByRole('heading', {name: 'Organize and Share'});
        expect(step3Heading).toBeInTheDocument();
        const step3Description = screen.getByText('Organize your expanded ideas and share them with your team or friends for feedback and collaboration.');
        expect(step3Description).toBeInTheDocument();

    })

})