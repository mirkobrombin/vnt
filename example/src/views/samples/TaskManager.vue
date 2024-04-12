<template>
    <Window>
        <template #top>
            <TitleBar>
                <template #area>
                    <Button @click="goBack" icon="chevron_left" type="flat" />
                    <Button @click="toggleAddTaskPopOver" ref="addTaskButton" icon="add" type="flat" />
                </template>
            </TitleBar>
        </template>
        <template #content>
            <PopOver v-if="showAddTaskPopOver" :attachTo="$refs.addTaskButton" @close="toggleAddTaskPopOver"
                class="TaskManager-popover">
                <HBox :spacing="8" :margin="10" align="fill">
                    <TextField v-model="newTask" placeholder="Enter a new task" label="Task Name" />
                    <Button type="suggested" @click="addTask" icon="check" />
                </HBox>
            </PopOver>
            <Dialog v-if="showEditDialog" :title="'Edit Task'" @close="toggleEditDialog" :confirm="updateTask"
                confirmText="Save" :cancel="toggleEditDialog" cancelText="Cancel">
                <TextField v-model="editTaskContent" label="Task Name" />
            </Dialog>
            <VBox class="TaskManager-list" :spacing="8" :margin="10" align="fill">
                <Card v-for="(task, index) in tasks" :key="task.id" class="TaskManager-task">
                    <HBox align="center" :spacing="8" :margin="5">
                        <h2>{{ task.content }}</h2>
                        <Button @click="prepareEditTask(index)" icon="edit" />
                        <Button @click="deleteTask(index)" icon="delete" type="destructive" />
                    </HBox>
                </Card>
            </VBox>
        </template>
    </Window>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TaskManager",
    data() {
        return {
            newTask: '',
            tasks: [] as { id: number; content: string }[],
            nextId: 1,
            showAddTaskPopOver: false,
            showEditDialog: false,
            editTaskIndex: null as number | null,
            editTaskContent: '',
        };
    },
    methods: {
        toggleAddTaskPopOver() {
            this.showAddTaskPopOver = !this.showAddTaskPopOver;
        },
        addTask() {
            if (this.newTask.trim() !== '') {
                this.tasks.push({ id: this.nextId++, content: this.newTask });
                this.newTask = '';
                this.toggleAddTaskPopOver();
            }
        },
        prepareEditTask(index: number) {
            this.editTaskIndex = index;
            this.editTaskContent = this.tasks[index].content;
            this.toggleEditDialog();
        },
        updateTask() {
            if (this.editTaskContent.trim() !== '' && this.editTaskIndex !== null) {
                this.tasks[this.editTaskIndex].content = this.editTaskContent;
                this.toggleEditDialog();
            }
        },
        deleteTask(index: number) {
            this.tasks.splice(index, 1);
        },
        toggleEditDialog() {
            this.showEditDialog = !this.showEditDialog;
        },
        goBack() {
            this.$router.back();
        },
    },
});
</script>


<style scoped>
.TaskManager {
    padding: 20px;
}

.TaskManager-header {
    margin-bottom: 20px;
}

.TaskManager-input {
    flex-grow: 1;
}

.TaskManager-list {
    overflow-y: auto;
}

.TaskManager-task {
    background-color: var(--background-base);
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.TaskManager-task h2 {
    font-size: 18px;
    margin: 0;
    flex-grow: 1;
}
</style>