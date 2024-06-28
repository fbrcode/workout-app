import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./styled/PressableText";

export type ExerciseFormData = {
  name: string;
  duration: string;
  type: string;
  reps?: string;
};

type ExerciseProps = {
  onSubmit: (form: ExerciseFormData) => void;
};

const selectionItems = ["exercise", "break", "stretch"];

export default function ExerciseForm({ onSubmit }: ExerciseProps) {
  // implementation without react-hook-form
  // const [form, setForm] = useState({ name: "", duration: "" });
  // const onChangeText = (field: string) => (value: string) => { setForm({...form, [field]: value }) };

  const { control, handleSubmit } = useForm<ExerciseFormData>();
  const [isSelectionOn, setSelectionOn] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Text>Exercise Form</Text> */}
      <View>
        {/* old implementation without react-hook-form
        <TextInput onChangeText={onChangeText("name")} value={form.name} placeholder="Exercise Name" style={styles.input} />
        <TextInput onChangeText={onChangeText("duration")} value={form.duration} placeholder="Duration (in seconds)" keyboardType="numeric" style={styles.input} />
        <PressableText text="Submit" onPress={() => onSubmit(form)} /> */}
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Name"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Duration (in secs)"
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            name="reps"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Reps (optional)"
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={{ flex: 1 }}>
                {isSelectionOn ? (
                  <View>
                    {selectionItems.map((selection) => (
                      <PressableText
                        key={selection}
                        text={selection}
                        style={styles.selection}
                        onPressIn={() => {
                          onChange(selection);
                          setSelectionOn(false);
                        }}
                      />
                    ))}
                  </View>
                ) : (
                  <TextInput
                    onPressIn={() => setSelectionOn(true)}
                    style={styles.input}
                    value={value}
                    placeholder="Type"
                  />
                )}
              </View>
            )}
          />
        </View>
        <PressableText
          style={{ marginTop: 10 }}
          text="Add Exercise"
          onPress={handleSubmit((data) => {
            onSubmit(data as ExerciseFormData);
          })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    margin: 2,
    borderWidth: 1,
    height: 30,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  rowContainer: {
    flexDirection: "row",
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center",
  },
});
