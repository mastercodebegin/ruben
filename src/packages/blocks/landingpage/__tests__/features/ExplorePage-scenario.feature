Feature: ExplorePage

    Scenario: User navigates to ExplorePage
        Given I am a User loading ExplorePage
        Then render flatlist
        Then user can see products list
