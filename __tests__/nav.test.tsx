import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import Nav from '@/app/components/mainPage/nav';

// Mock the useSession hook from next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockUseSession = useSession as jest.Mock;

describe('Nav', () => {

  beforeEach(() => {
    // Mock the session data
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
        },
      },
      status: 'authenticated',
    });
  });

  it('renders the navigation component', () => {
    render(
        <Nav />
    );

    // Check if the title is rendered
    expect(screen.getByText('IdeaTracker+')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  test('toggles the mobile menu when the menu icon is clicked', async () => {
    render(<Nav />);
    

    // Click the menu icon
    fireEvent.click(screen.getByTestId('menu-icon'));
    
    // Check if the mobile menu is now open by checking for the 'Home' link
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
    homeLinks.forEach(link => expect(link).toBeInTheDocument());

    const dashboardLinks = screen.getAllByText('Dashboard');
    expect(dashboardLinks.length).toBeGreaterThan(0);
    dashboardLinks.forEach(link => expect(link).toBeInTheDocument());


  });


  it('displays user information when logged in', () => {
    render(<Nav />);

    // Open the menu to reveal user information
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    // Use within to search within the specific div containing user info
    const userInfoDiv = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "span" && /welcome, john doe/i.test(content);
    }).closest('div');

    expect(userInfoDiv).toBeInTheDocument();

    const userInfo = within(userInfoDiv!).getByText(/welcome, john doe/i);
    expect(userInfo).toBeInTheDocument();
  });



});
