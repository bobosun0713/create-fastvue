import { mount, RouterLinkStub } from "@vue/test-utils";

import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    expect(wrapper.text()).toContain("You’ve successfully created");
  });
});
