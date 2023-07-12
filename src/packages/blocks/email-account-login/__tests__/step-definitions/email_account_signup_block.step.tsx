import React from "react";
import EmailAccountSignupBlock from "../../src/EmailAccountSignupBlock";
import { fireEvent, render } from "@testing-library/react-native";

const navigation = {
  navigate: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
};

const screenProps = {
  navigation: navigation,
  id: "EmailAccountSignupBlock",
};

describe("MyComponent", () => {
  it("user trying to signUp as a merchent", () => {
    const { getByTestId } = render(
      <EmailAccountSignupBlock {...screenProps} />
    );
    const merchantBox = getByTestId("merchant_check_box_id");
    fireEvent.press(merchantBox);
    const merchantEmail = getByTestId("merchant_mail");
    fireEvent.changeText(merchantEmail, "test@example.com");
    expect(merchantEmail.props.value).toBe("test@example.com");
    const merchantPassword = getByTestId("merchant_password_text_input_id");
    fireEvent.changeText(merchantPassword, "Qweqwe123!");
    expect(merchantPassword.props.value).toBe("Qweqwe123!");
    const farmName = getByTestId("name_of_farm_test_id");
    fireEvent.changeText(farmName, "Qweqwe123!");
    expect(farmName.props.value).toBe("Qweqwe123!");
    const product = getByTestId("product_of_farm_test_id");
    fireEvent.changeText(product, "Beef");
    expect(product.props.value).toBe("Beef");
    const farmLocation = getByTestId("farm_location_test_id");
    fireEvent.changeText(farmLocation, "California");
    expect(farmLocation.props.value).toBe("California");
    const contactInf = getByTestId("farm_contact_info_id");
    fireEvent.changeText(contactInf, "+905467890");
    expect(contactInf.props.value).toBe("+905467890");
    const farmDesc = getByTestId("farm_desc_id");
    fireEvent.changeText(farmDesc, "you can get natural products");
    expect(farmDesc.props.value).toBe("you can get natural products");
    const farmWeb = getByTestId("farm_website_id");
    fireEvent.changeText(farmWeb, "www.testfarm.com");
    expect(farmWeb.props.value).toBe("www.testfarm.com");
    const farmSocial = getByTestId("farm_social_id");
    fireEvent.changeText(farmSocial, "https://instagram.com/newfarm/456");
    expect(farmSocial.props.value).toBe("https://instagram.com/newfarm/456");
  });
});
