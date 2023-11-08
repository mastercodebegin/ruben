Feature: StripeIntegration

    Scenario: User navigates to StripeIntegration
        Given I am a User loading StripeIntegration
        When I navigate to the StripeIntegration
        Then StripeIntegration will load with out errors
        Then should return 3.99 for storageClass Gold
        Then Receive function works properly
        Then paymentMethod api
        Then codMethod api
        Then I can select the button with with out errors
        Then I can enter text with out errors
        Then I can enter card number
        Then I can enter card expirtydate
        Then I can enter card expirtydate with digit
        Then I can enter cvv
        Then card button event
        Then cod button event
        Then close payment alert
        Then Payment alert
        Then Payment Alert Called
        Then Payment all texts
        Then Payment all images
        Then should change paymentAlerttype to "ThankYouForYourOder" and call handlePaymentSuccess
        Then should change paymentAlerttype to "ContinueToEmail" and call handlePaymentSuccess
        Then should navigate to InvoiceBilling and set showPaymentAlert to false for unexpected paymentAlerttype
        Then should do nothing if isOrderSuccess is false
        Then should set showPaymentLoading to true and call getPaymentMethod for paymentMethodType as Card
        Then should call codeApiCalled and set showPaymentAlert to true when paymentMethodType is not "Card"
        Then Double button
        Then should handle payment method type "Card" correctly
        Then should update expirtyDate state with a valid month
        Then should set custom alert text and description for "Card" payment method type
        Then  stripe payment api
        And I can leave the screen with out errors