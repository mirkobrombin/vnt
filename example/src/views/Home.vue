<template>
    <Window>
        <template #top>
            <TitleBar>
            </TitleBar>
        </template>

        <template #content>
            <SideLayout class="Toolkit" context="mainLayout">
                <template #sidebar>
                    <MenuSwitcher context="mainMenu" :items="mainSwitcheritems" @changePage="restorePanel" />
                </template>
                <template #content>
                    <StaticNotebook context="mainMenu">
                        <Showcase title="TabsSwitcher & Notebook"
                            description="A component to switch between tabs and pages">
                            <TabsSwitcher :allowNewTabs="true" context="mainTabs" />
                            <Notebook :newPageContent="newPage" context="mainTabs" />
                        </Showcase>

                        <Showcase title="Button" description="A component to trigger actions">
                            <HBox :spacing="15">
                                <Button label="Normal Action" @click="console.log('ciao')" />
                                <Button label="Suggested Action" @click="console.log('ciao')" icon="check"
                                    type="suggested" />
                                <Button label="Destructive Action" @click="console.log('ciao')" icon="close"
                                    type="destructive" />
                            </HBox>
                        </Showcase>

                        <Showcase title="Switcher" description="A component to toggle between two states">
                            <HBox :spacing="40">
                                <Switcher :model="switcherValue" @update:model="switcherValue = $event" />
                                <p>Switcher value: <u>{{ switcherValue }}</u></p>
                            </HBox>
                        </Showcase>

                        <Showcase title="Dialog" description="A component to display messages and confirmations">
                            <VBox :spacing="20" align="start">
                                <Button label="Show Dialog" @click="showModal" />
                                <Dialog v-if="modalShowing" title="Hello, World!"
                                    :messages="['This is a simple dialog to showcase the Dialog component.', 'You can use it to display messages, confirmations, and more.']"
                                    :confirm="showModal" confirmText="Confirm Action" :cancel="showModal"
                                    cancelText="Cancel" />
                            </VBox>
                        </Showcase>

                        <Showcase title="PopOver" description="A component to display a menu">
                            <VBox :spacing="20" align="start">
                                <Button @click="togglePopOver" icon="menu" ref="popOverButton" />
                                <PopOver v-if="popOverShowing" :attachTo="$refs.popOverButton" @close="togglePopOver">
                                    <Menu :items="menuItems" />
                                </PopOver>
                            </VBox>
                        </Showcase>

                        <Showcase title="Menu" description="A component to display a list of items">
                            <Menu :items="menuItems" />
                        </Showcase>

                        <Showcase title="Carousel" description="A component to show a series of items">
                            <Carousel>
                                <VBox align="center">
                                    <TextRich>
                                        <h1>Slide 1</h1>
                                    </TextRich>
                                </VBox>
                                <VBox align="center">
                                    <TextRich>
                                        <h1>Slide 2</h1>
                                    </TextRich>
                                </VBox>
                                <VBox align="center">
                                    <TextRich>
                                        <h1>Slide 3</h1>
                                    </TextRich>
                                </VBox>
                            </Carousel>
                        </Showcase>

                        <Showcase title="Paned" description="A component to resize two areas">
                            <Paned>
                                <template #left>
                                    <TextRich>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit urna
                                            non lacus malesuada rhoncus. Nam eget nisi id magna venenatis hendrerit at
                                            ac augue. Sed quis ultrices tortor, eu cursus enim. Sed malesuada sit amet
                                            turpis non euismod. Suspendisse metus est, blandit vel fermentum ut, luctus
                                            sed nibh. Ut vel venenatis nibh. Nunc in eros et nulla pellentesque
                                            lobortis. Sed tincidunt a nibh quis feugiat. Vivamus orci dolor, interdum
                                            nec lacinia vitae, commodo quis metus. Fusce euismod non arcu nec elementum.
                                            Fusce volutpat vitae eros sit amet tempor. Sed feugiat, turpis at tincidunt
                                            posuere, erat erat luctus augue, ac lobortis libero libero ut sem. Proin a
                                            consequat quam.</p>
                                    </TextRich>
                                </template>
                                <template #right>
                                    <TextRich>
                                        <p>Pellentesque et tortor vitae dui fermentum convallis. Vivamus lacinia, elit
                                            sit amet eleifend interdum, dolor nunc facilisis dolor, ac aliquet mi mauris
                                            cursus ex. Pellentesque molestie, felis non lobortis sodales, orci dui
                                            suscipit elit, ac consequat lectus purus vitae justo. Curabitur vel sem
                                            mauris. Donec dictum malesuada commodo. Nullam in nisl mauris. Etiam in
                                            finibus mauris. Maecenas sed orci ac mi pharetra faucibus. Pellentesque
                                            sollicitudin posuere erat, eu tempor ante egestas sed. Etiam consequat
                                            convallis dui, vel gravida dolor tincidunt non. Duis ornare ex vitae egestas
                                            sodales. Morbi id enim bibendum, aliquet magna et, laoreet leo. Integer
                                            finibus lorem enim. Cras vel dui pellentesque, iaculis risus laoreet,
                                            pharetra lectus.</p>
                                    </TextRich>
                                </template>
                            </Paned>
                        </Showcase>

                        <Showcase title="SideLayout" description="A component to resize two areas">
                            <SideLayout>
                                <template #sidebar>
                                    <Menu :items="menuItems" />
                                </template>
                                <template #content>
                                    <TextRich>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit urna
                                            non lacus malesuada rhoncus. Nam eget nisi id magna venenatis hendrerit at
                                            ac augue. Sed quis ultrices tortor, eu cursus enim. Sed malesuada sit amet
                                            turpis non euismod. Suspendisse metus est, blandit vel fermentum ut, luctus
                                            sed nibh. Ut vel venenatis nibh. Nunc in eros et nulla pellentesque
                                            lobortis. Sed tincidunt a nibh quis feugiat. Vivamus orci dolor, interdum
                                            nec lacinia vitae, commodo quis metus. Fusce euismod non arcu nec elementum.
                                            Fusce volutpat vitae eros sit amet tempor. Sed feugiat, turpis at tincidunt
                                            posuere, erat erat luctus augue, ac lobortis libero libero ut sem. Proin a
                                            consequat quam.</p>
                                        <p>Pellentesque et tortor vitae dui fermentum convallis. Vivamus lacinia, elit
                                            sit amet eleifend interdum, dolor nunc facilisis dolor, ac aliquet mi mauris
                                            cursus ex. Pellentesque molestie, felis non lobortis sodales, orci dui
                                            suscipit elit, ac consequat lectus purus vitae justo. Curabitur vel sem
                                            mauris. Donec dictum malesuada commodo. Nullam in nisl mauris. Etiam in
                                            finibus mauris. Maecenas sed orci ac mi pharetra faucibus. Pellentesque
                                            sollicitudin posuere erat, eu tempor ante egestas sed. Etiam consequat
                                            convallis dui, vel gravida dolor tincidunt non. Duis ornare ex vitae egestas
                                            sodales. Morbi id enim bibendum, aliquet magna et, laoreet leo. Integer
                                            finibus lorem enim. Cras vel dui pellentesque, iaculis risus laoreet,
                                            pharetra lectus.</p>
                                    </TextRich>
                                </template>
                            </SideLayout>
                        </Showcase>

                        <Showcase title="MenuSwitcher" description="A component to switch between pages">
                            <SideLayout>
                                <template #sidebar>
                                    <MenuSwitcher context="exampleMenu" :items="menuSwitcherItems" />
                                </template>
                                <template #content>
                                    <StaticNotebook context="exampleMenu">
                                        <div>
                                            <TextRich>
                                                <div style="text-align: center">
                                                    <h1>Hello, World!</h1>
                                                    <p>This is the page 1 of the MenuSwitcher component.</p>
                                                </div>
                                            </TextRich>
                                        </div>
                                        <div>
                                            <TextRich>
                                                <div style="text-align: center">
                                                    <h1>Ciao, Mondo!</h1>
                                                    <p>This is the page 2 of the MenuSwitcher component.</p>
                                                </div>
                                            </TextRich>
                                        </div>
                                        <div>
                                            <TextRich>
                                                <div style="text-align: center">
                                                    <h1>Bonjour, le Monde!</h1>
                                                    <p>This is the page 3 of the MenuSwitcher component.</p>
                                                </div>
                                            </TextRich>
                                        </div>
                                    </StaticNotebook>
                                </template>
                            </SideLayout>
                        </Showcase>

                        <Showcase title="Slider" description="A component to select a value">
                            <Slider v-model="sliderValue" :min="0" :max="100" :labels="['Low', 'Medium', 'High']" />
                            <p>Slider value: <u>{{ sliderValue }}</u></p>
                        </Showcase>

                        <Showcase title="TextField" description="A component to input text">
                            <VBox :spacing="40" :margin="8" align="fill">
                                <VBox :spacing="20" align="fill">
                                    <TextField label="Name" placeholder="Type your name" v-model="textValue" />
                                    <p>Text value: <u>{{ textValue }}</u></p>
                                </VBox>

                                <VBox :spacing="20" align="fill">
                                    <TextField label="Name" placeholder="Example with icon" v-model="textValue"
                                        icon="person" />
                                </VBox>

                                <VBox :spacing="20" align="fill">
                                    <TextField label="Name" placeholder="Example with icon (left)" v-model="textValue"
                                        icon="person" iconPosition="left" />
                                </VBox>
                            </VBox>
                        </Showcase>

                        <Showcase title="SelectField" description="A component to select an option">
                            <VBox :spacing="40" :margin="8" align="fill">
                                <VBox :spacing="20" align="fill">
                                    <SelectField label="Type your name" v-model="selectValue"
                                        :options="selectOptions" />
                                    <p>Selected value: <u>{{ selectValue }}</u></p>
                                </VBox>

                                <VBox :spacing="20" align="fill">
                                    <SelectField label="Example with icon" v-model="selectValue"
                                        :options="selectOptions" icon="person" />
                                </VBox>

                                <VBox :spacing="20" align="fill">
                                    <SelectField label="Example with icon (left)" v-model="selectValue"
                                        :options="selectOptions" icon="person" iconPosition="left" />
                                </VBox>
                            </VBox>
                        </Showcase>

                        <Showcase title="TextRich" description="A component to display rich text">
                            <TextRich>
                                <p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Nulla malesuada
                                    congue
                                    <s>imperdiet</s>.
                                    Aenean tincidunt
                                    urna at ipsum iaculis, eget rhoncus <i>ligula</i> vehicula. Proin tempus fringilla
                                    bibendum.
                                    Cras
                                    orci eros, cursus
                                    at cursus at, varius nec elit. Etiam rhoncus <u>ultrices</u> nibh. Vestibulum
                                    fermentum erat
                                    lacus,
                                    id tincidunt
                                    ipsum hendrerit et. <code>Suspendisse</code> odio sapien, interdum quis lacus eu,
                                    commodo
                                    pharetra odio.
                                    Morbi quis elit
                                    ex.
                                </p>
                                <h1>Heading 1</h1>
                                <h2>Heading 2</h2>
                                <h3>Heading 3</h3>
                                <h4>Heading 4</h4>
                                <h5>Heading 5</h5>
                                <h6>Heading 6</h6>
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                                <ol>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ol>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Header 1</th>
                                            <th>Header 2</th>
                                            <th>Header 3</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Row 1, Cell 1</td>
                                            <td>Row 1, Cell 2</td>
                                            <td>Row 1, Cell 3</td>
                                        </tr>
                                        <tr>
                                            <td>Row 2, Cell 1</td>
                                            <td>Row 2, Cell 2</td>
                                            <td>Row 2, Cell 3</td>
                                        </tr>
                                        <tr>
                                            <td>Row 3, Cell 1</td>
                                            <td>Row 3, Cell 2</td>
                                            <td>Row 3, Cell 3</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <blockquote>
                                    <p>Aenean vestibulum ligula sed felis egestas, ut porta lorem finibus. Fusce
                                        fermentum
                                        lacinia vehicula.
                                        Mauris sodales massa eget sollicitudin varius. Praesent ex turpis, malesuada
                                        eget
                                        rhoncus et, pulvinar
                                        at mi. Morbi quis tellus eros. Nullam metus justo, porta sit amet interdum
                                        vitae, luctus
                                        a orci. Vivamus
                                        ac tempor purus, ac porta magna. Mauris accumsan convallis semper. In ut
                                        dignissim
                                        felis.</p>
                                </blockquote>
                                <code>
            <pre>
                const hello = "world";
                console.log(hello);
            </pre>
        </code>
                            </TextRich>
                        </Showcase>

                        <Showcase title="Window" description="A component to display a window">
                            <Window>
                                <template #top>
                                    <TitleBar>
                                        <template #area>

                                        </template>
                                    </TitleBar>
                                </template>

                                <template #content>
                                    <TextRich>
                                        <p>Content of the window</p>
                                    </TextRich>
                                </template>
                            </Window>
                        </Showcase>

                        <Showcase title="ContextArea" description="A component to display a context menu">
                            <ContextArea :items="contextMenuItems">
                                <template #area>
                                    <TextRich>
                                        <p>Rigth click here to show the context menu</p>
                                    </TextRich>
                                </template>
                            </ContextArea>
                        </Showcase>

                        <Showcase title="Dark Mode" description="Switch between light and dark mode">
                            <VBox :spacing="10" align="fill">
                                <Switcher :model="themeSwitcherValue" @update:model="themeSwitcherValue = $event" />
                                <p>Theme: <u>{{ themeSwitcherValue ? "Dark" : "Light" }}</u></p>
                            </VBox>
                        </Showcase>

                        <!-- Samples -->
                        <Showcase title="Samples" description="A collection of samples">
                            <VBox :spacing="20" align="start">
                                <Button label="Calculator" @click="$router.push('/calculator')" />
                                <Button label="Task Manager" @click="$router.push('/task-manager')" />
                                <Button label="Notepad" @click="$router.push('/notepad')" />
                            </VBox>
                        </Showcase>

                    </StaticNotebook>
                </template>
            </SideLayout>
        </template>
    </Window>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";

import Showcase from "vnt/internal/Showcase.vue";
import Dummy from "vnt/internal/Dummy.vue";
import VBox from "../../../widgets/VBox.vue";

export default defineComponent({
    name: "Home",
    components: {
        Showcase,
        Dummy,
    },
    data() {
        return {
            modalShowing: false,
            popOverShowing: false,
            menuItems: [
                { label: "Item 1", action: () => console.log("Item 1") },
                { label: "Item 2", action: () => console.log("Item 2") },
                { label: "Item 3", action: () => console.log("Item 3") }
            ],
            contextMenuItems: [
                { id: 1, text: "Item 1", shortcut: "Ctrl+1", icon: "check", action: () => console.log("Item 1"), submenu: [] },
                { id: 2, text: "Item 2", shortcut: "Ctrl+2", icon: "close", action: () => console.log("Item 2"), submenu: [] },
                { id: 3, text: "Item 3", shortcut: "Ctrl+3", icon: "menu", action: () => console.log("Item 3"), submenu: [] }
            ],
            mainSwitcheritems: [
                { label: "TabsSwitcher & Notebook", pageId: 0 },
                { label: "Button", pageId: 1 },
                { label: "Switcher", pageId: 2 },
                { label: "Dialog", pageId: 3 },
                { label: "PopOver", pageId: 4 },
                { label: "Menu", pageId: 5 },
                { label: "Carousel", pageId: 6 },
                { label: "Paned", pageId: 7 },
                { label: "SideLayout", pageId: 8 },
                { label: "MenuSwitcher", pageId: 9 },
                { label: "Slider", pageId: 10 },
                { label: "TextField", pageId: 11 },
                { label: "SelectField", pageId: 12 },
                { label: "TextRich", pageId: 13 },
                { label: "Window", pageId: 14 },
                { label: "ContextArea", pageId: 15 },
                { label: "Dark Mode", pageId: 16 },
                { label: "Samples", pageId: 17 },
            ],
            menuSwitcherItems: [
                { label: "Page 1", pageId: 0 },
                { label: "Page 2", pageId: 1 },
                { label: "Page 3", pageId: 2 }
            ],
            switcherValue: false,
            sliderValue: 50,
            textValue: "",
            selectValue: "",
            selectOptions: [
                { text: "Option 1", value: "option1" },
                { text: "Option 2", value: "option2" },
                { text: "Option 3", value: "option3" }
            ],
            themeSwitcherValue: false,
        };
    },
    mounted() {
        console.log("Toolkit mounted");
    },
    methods: {
        newPage() {
            console.log("New page");
            return {
                component: shallowRef(Dummy),
                props: {},
            };
        },
        showModal() {
            this.modalShowing = !this.modalShowing;
        },
        togglePopOver() {
            this.popOverShowing = !this.popOverShowing;
        },
        restorePanel() {
            this.$eventBus.emit("mainLayout-close");
        },
    },
    watch: {
        themeSwitcherValue(value) {
            document.body.classList.toggle("dark", value);
        },
    },
});
</script>

<style scoped>
.Toolkit {
    background-color: var(--background-base);
}
</style>