Feature: MyProfile

    Scenario: User navigates to MyProfileScreen
        Given I am a User loading MyProfileScreen
        Given I am a User entering MyProfileScreen after signup
        When I navigate to the My profile screen
        When I navigate to the My profile screen I can open facebook profile
        Then User navigate to facebook profile in browser
        Then User trying to open invalid instagram link
        Then User navigate to instagram profile in browser
        Then User trying to open invalid whatsapp link
        Then User navigate to whats app
        Then profile screen will load with out errors
        Then user trying to update profile details
        Then user updating profile picture
        Then user navigating to my orders screen
        Then user naviagating to my credit screen
        Then user pressing see all button to navigate selected tab
        And I can see the profile details without error
        And I can leave the screen with out errors
