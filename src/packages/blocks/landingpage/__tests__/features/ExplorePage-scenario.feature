Feature: ExplorePage

    Scenario: User navigates to ExplorePage
        Given I am a User loading ExplorePage
        Then referesh controller
        Then user searching with product name
        Then render flatlist
        Then load category list
        Then load subcategories list
        Then on end riched
        Then sorting correctly
        Then select filter
        Then close dropdown
        Then mapStateToProps should return the right value
        Then mapDispatchToProps should return the right value
        Then user can see products list
