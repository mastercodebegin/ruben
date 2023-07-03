Feature: contactus

    Scenario: User navigates to contactus
        Given I am a User loading contactus
        Then user entering name
        Then user entering email address
        Then user entering query
        And user trying submit the query        