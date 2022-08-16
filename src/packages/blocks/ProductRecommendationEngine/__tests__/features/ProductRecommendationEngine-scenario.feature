Feature: ProductRecommendationEngine

    Scenario: User navigates to ProductRecommendationEngine
        Given I am a User loading ProductRecommendationEngine
        When I navigate to the ProductRecommendationEngine
        Then ProductRecommendationEngine will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors