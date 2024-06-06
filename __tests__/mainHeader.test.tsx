import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "@/app/components/mainPage/header";

describe('Header', () => {
    // describe what should be render

    it('should render a header with correct content', () => {
        render(<Header />);
        
        // Check if the main heading is in the document
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();

        // Check if the main heading is in the document
        const mainHeading = screen.getByRole('heading', {level: 1});
        expect(mainHeading).toBeInTheDocument();
        expect(mainHeading).toHaveTextContent('Turn Your Ideas into Reality with IdeaTracker+');

        //Check if paragrap is in the document
        const paragraph = screen.getByText(/Track your ideas effortlessly and let OpenAI help you expand them into actionable plans./i)
        expect(paragraph).toBeInTheDocument();

        //Check if the link/button is in the document
        const startNowLink = screen.getByRole('link', {name: /Start Now/i});
        expect(startNowLink).toBeInTheDocument();
        expect(startNowLink).toHaveAttribute('href', '/register');

        //Check if the background image div is present and has the correct class

        const backgroundImageDiv = screen.getByTestId('background-image');
        expect(backgroundImageDiv).toHaveStyle({
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/idea.jpeg")'
          });

    })


})

