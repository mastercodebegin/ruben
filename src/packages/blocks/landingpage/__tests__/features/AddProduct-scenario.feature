Feature: AddProduct

    Scenario: User navigates to add product screen
        Given users loading add product screen
        Then load dropdown
        Then goBack navigation
        Then add More Products
        Then users can see available product list