<script setup>
// import Computed from "./components/Computed.vue";
// import ComputedVsMethod from "./components/ComputedVsMethod.vue";
// import RealWorldComputedExample from "./components/RealWorldComputedExample.vue";
// import WritableComputed from "./components/WritableComputed.vue";
// import Watchers from "./components/Watchers.vue";
// import Debounce from "./components/Debounce.vue";
// import WatchEffect from "./components/WatchEffect.vue";
// import LifeCycleHook from "./components/LifeCycleHook.vue";
// import Week9Task from "./components/Week9Task.vue";
// import Week10Task from "./components/Week10Task.vue";
// import PropsParent from "./components/props/PropsParent.vue";
// import UserCardParent from "./components/props/UserCardParent.vue";
// import BaseButton from "./components/props/BaseButton.vue";
// import ParentComponent from "./components/emits/ParentComponent.vue";
// import EmitValParent from "./components/emits/EmitValParent.vue";
// import CustomInputParent from "./components/emits/CustomInputParent.vue";
// import EmitParent from "./components/emits/EmitParent.vue";
// import Week11TaskParent from "./components/Week11TaskParent.vue";
// import Slot from "./components/slot/Slot.vue";
// import GrandParent from "./components/provideinject/GrandParent.vue";

// import ThemeProvider from "./components/provideinject/ThemeProvider.vue";
// import Theme from "./components/provideinject/Theme.vue";
// import Switcher from "./components/dynamicComponent/Switcher.vue";

// import NotificationContainer from "./components/Week12Task/NotificationContainer.vue";
// import NotificationProvider from "./components/Week12Task/NotificationProvider.vue";

import Navbar from "./components/pinia/Navbar.vue";
import store from "./components/pinia/Store.vue";
import UserLogin from "./components/pinia/UserLogin.vue";
</script>

<template>
  <!-- <BaseButton variant="primary" size="large"> Click Me </BaseButton>

  <BaseButton variant="danger" :loading="true"> Submitting... </BaseButton>

  <BaseButton variant="ghost" icon="⚙️"> Settings </BaseButton> -->

  <!-- <ThemeProvider>
    <Theme />
  </ThemeProvider> -->
  <Navbar />
  <store />
  <UserLogin />
</template>
