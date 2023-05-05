import { Slot, component$ } from "@builder.io/qwik";

interface ConfirmProps {
  confirm: any;
  cancel: any;
}

export default component$((props: ConfirmProps) => (
  <div class="p-4">
    <p class="p-4">
      <Slot />
    </p>
    <div class="actions">
      <button class="btn btn-secondary" onClick$={props.cancel}>
        No
      </button>
      <button class="btn btn-primary" onClick$={props.confirm}>
        Yes
      </button>
    </div>
  </div>
));
