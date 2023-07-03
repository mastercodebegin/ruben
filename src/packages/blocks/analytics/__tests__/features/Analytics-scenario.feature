Feature: Analytics

    Scenario: User navigates to Analytics
        Given I am a User loading Analytics
        When I navigate to the Analytics
        Then Analytics will load with out errors
        Then go back navigation
        Then load chart data
        Then show_calendar
        Then load calendar
        Then load dropdown
