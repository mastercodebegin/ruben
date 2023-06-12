Feature: ExplorePage

    Scenario: User navigates to ExplorePage
        Given I am a User loading ExplorePage
        Then render flatlist
        Then load category list
        Then load subcategories list
        Then sorting correctly
        Then user can see products list
