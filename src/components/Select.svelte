<script lang="ts">
    let containerEl = $state<HTMLElement | undefined>(undefined);
    interface Option {
        value: string;
        label: string;
    }

    interface Props {
        options: Option[];
        placeholder?: string;
        value?: string[];
        onchange?: (values: string[]) => void;
    }

    let {
        options,
        placeholder = "Select Categories",
        value = $bindable([]),
        onchange,
    }: Props = $props();

    let isOpen = $state(false);
    let selected = $state<string[]>(value ?? []);

    const selectedLabels = $derived(
        selected
            .map((val) => options.find((o) => o.value === val)?.label)
            .filter(Boolean)
            .join(", "),
    );

    function toggle() {
        isOpen = !isOpen;
    }

    function close() {
        isOpen = false;
    }

    function handleOptionChange(optValue: string) {
        if (selected.includes(optValue)) {
            selected = selected.filter((v) => v !== optValue);
        } else {
            selected = [...selected, optValue];
        }
        value = [...selected];
        onchange?.(selected);
    }

    function handleTriggerKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    }

    function handleDocumentClick(e: MouseEvent) {
        if (containerEl && !containerEl.contains(e.target as Node)) {
            close();
        }
    }
</script>

<svelte:document on:click={handleDocumentClick} />

<div bind:this={containerEl} class="relative block w-full font-sans">
    <!-- Trigger -->
    <button
        type="button"
        class="w-full min-h-13 px-4 py-3 flex items-center justify-between bg-transparent border-b border-white text-white cursor-pointer transition-all duration-200 hover:border-neutral-600"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onclick={(e) => {
            e.stopPropagation();
            toggle();
        }}
        onkeydown={handleTriggerKeydown}
    >
        <div
            class="flex items-center gap-2 overflow-hidden whitespace-nowrap flex-nowrap flex-1"
        >
            {#if selected.length === 0}
                <span class="text-white">{placeholder}</span>
            {:else}
                <span class="text-white">{selectedLabels}</span>
            {/if}
        </div>

        <!-- Chevron -->
        <svg
            class="shrink-0 transition-transform duration-250 text-neutral-400 {isOpen
                ? 'rotate-180'
                : ''}"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>

    <!-- Dropdown -->
    {#if isOpen}
        <div
            class="absolute left-0 right-0 bg-white rounded-b-[10px] z-100 max-h-80 overflow-y-auto py-1.5"
            role="listbox"
            aria-multiselectable="true"
        >
            {#each options as opt (opt.value)}
                {@const isActive = selected.includes(opt.value)}
                <label
                    class="flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors duration-150 hover:bg-neutral-50 {isActive
                        ? 'bg-green-50'
                        : ''}"
                >
                    <input
                        type="checkbox"
                        value={opt.value}
                        checked={isActive}
                        class="hidden"
                        onchange={() => handleOptionChange(opt.value)}
                    />

                    <!-- Square (unchecked) -->
                    {#if !isActive}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-5 text-neutral-400 shrink-0"
                            ><rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                            /></svg
                        >
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="size-5 text-green-500 shrink-0"
                            ><rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                            /><path d="m9 12 2 2 4-4" /></svg
                        >

                        <!-- SquareCheck (checked) -->
                    {/if}

                    <span class="text-sm text-neutral-800">{opt.label}</span>
                </label>
            {/each}
        </div>
    {/if}
</div>
