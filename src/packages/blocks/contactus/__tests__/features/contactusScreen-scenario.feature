Feature: contactus

    Scenario: User navigates to contactus
        Given I am a User loading contactus
        Then user entering name
        Then user entering email address
        Then user entering query
        Then user trying submit the query with invalid email address
        Then user trying to contact through email
        Then user trying to contact through instagram
        Then user trying to contact through website
        And user trying submit the query        