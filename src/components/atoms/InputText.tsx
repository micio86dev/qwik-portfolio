import { component$ } from "@builder.io/qwik";
import type { InputTextProps } from "~/types";

export default component$((props: InputTextProps) => (
  <div class="field">
    {props.label && props.name && <label for={props.name}>{props.label}</label>}
    <input
      class={props.class}
      type={props.type ?? "text"}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      required={props.required}
      onInput$={props["on-input"]}
    />
  </div>
));
