import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [cadastros, setCadastros] = useState([]);
  const [tela, setTela] = useState('cadastro'); // 'cadastro' ou 'lista'
  const [editandoId, setEditandoId] = useState(null);

  const nomeRef = useRef();
  const emailRef = useRef();

  const [defaultNome, setDefaultNome] = useState('');
  const [defaultEmail, setDefaultEmail] = useState('');

  const handleSalvar = () => {
    const nome = nomeRef.current?.value || nomeRef.current._lastNativeText || '';
    const email = emailRef.current?.value || emailRef.current._lastNativeText || '';

    if (!nome.trim() || !email.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    if (editandoId) {
      const atualizados = cadastros.map((item) =>
        item.id === editandoId ? { ...item, nome, email } : item
      );
      setCadastros(atualizados);
      alert('Cadastro atualizado!');
    } else {
      const novo = {
        id: Date.now().toString(),
        nome,
        email,
      };
      setCadastros((prev) => [...prev, novo]);
      alert('Cadastro salvo!');
    }

    setEditandoId(null);
    setDefaultNome('');
    setDefaultEmail('');
    setTela('lista');
  };

  const handleEditar = (item) => {
    setDefaultNome(item.nome);
    setDefaultEmail(item.email);
    setEditandoId(item.id);
    setTela('cadastro');
  };

  const handleExcluir = (id) => {
    const novos = cadastros.filter((item) => item.id !== id);
    setCadastros(novos);
  };

  const TelaCadastro = () => (
    <View style={styles.container}>
      <Text style={styles.header}>
        {editandoId ? 'Editar Cadastro' : 'Novo Cadastro'}
      </Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        ref={nomeRef}
        defaultValue={defaultNome}
        placeholder="Digite o nome"
        style={styles.input}
        autoFocus
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        ref={emailRef}
        defaultValue={defaultEmail}
        placeholder="Digite o email"
        keyboardType="email-address"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>
          {editandoId ? 'ATUALIZAR' : 'SALVAR'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#666' }]}
        onPress={() => {
          setTela('lista');
          setEditandoId(null);
          setDefaultNome('');
          setDefaultEmail('');
        }}
      >
        <Text style={styles.buttonText}>VER LISTA</Text>
      </TouchableOpacity>
    </View>
  );

  const TelaLista = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Cadastros</Text>

      {cadastros.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Nenhum cadastro ainda.</Text>
      ) : (
        <FlatList
          data={cadastros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Nome: {item.nome}</Text>
              <Text style={styles.itemText}>Email: {item.email}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                  onPress={() => handleEditar(item)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: '#f44336' }]}
                  onPress={() => handleExcluir(item.id)}
                >
                  <Text style={styles.actionText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => {
          setTela('cadastro');
          setEditandoId(null);
          setDefaultNome('');
          setDefaultEmail('');
        }}
      >
        <Text style={styles.buttonText}>NOVO CADASTRO</Text>
      </TouchableOpacity>
    </View>
  );

  return tela === 'cadastro' ? <TelaCadastro /> : <TelaLista />;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
