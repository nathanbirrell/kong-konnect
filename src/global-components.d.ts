// Import the Kongponents GlobalComponents interface
import '@kong/kongponents/dist/types/global-components'

// declare module '@kong/kongponents'

// Feel free to add your host app's other globally registered components as needed
// import type YourGlobalComponent from './components/YourGlobalComponent.vue'

declare module '@vue/runtime-core' {
  // Add all host app globally-registered components
  export interface GlobalComponents {
    // YourGlobalComponent: typeof YourGlobalComponent
  }
}
