Feature: Analytics

    Scenario: User navigates to Analytics
        Given I am a User loading Analytics
        When I navigate to the Analytics
        Then analytic api
        Then Analytics will load with out errors
        Then go back navigation
        Then load chart data
        Then analyticsRes
        Then show_calendar
        Then load calendar
        Then load dropdown
        Then chart Data load
        Then Check misc functions
