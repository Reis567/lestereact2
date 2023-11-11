import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditContato.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';


const EditContato = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [contato, setContato] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    language: '',
    birthday: '',
    avatar: '',
  });

  useEffect(() => {
    const existingContatos = JSON.parse(localStorage.getItem('contatos')) || [];
    
    const contatoToEdit = existingContatos.find((c) => c.id.toString() === id.toString());
    
    if (contatoToEdit) {
      setContato(contatoToEdit);
    }
  }, [id]);
  

  const updateContato = (e) => {
    e.preventDefault();
    const existingContatos = JSON.parse(localStorage.getItem('contatos')) || [];


    const contatoIndex = existingContatos.findIndex((c) => c.id.toString() === id.toString());

    if (contatoIndex !== -1) {
      existingContatos[contatoIndex] = contato;
      localStorage.setItem('contatos', JSON.stringify(existingContatos));
      navigate('/'); // Redirecionar para a home
    }
  };

  return (
    <div className='edit-contato'>
      <h2>Editar contato</h2>
      <form onSubmit={updateContato}>
        <div className='form-control'>
          <label htmlFor='first_name'>Nome:</label>
          <Input
            type='text'
            name='first_name'
            value={contato.first_name}
            onChange={(e) => setContato({ ...contato, first_name: e.target.value })}
            required
            className='inputform'/>
        </div>
        <div className='form-control'>
          <label htmlFor='last_name'>Sobrenome:</label>
          <Input
            type='text'
            name='last_name'
            value={contato.last_name}
            onChange={(e) => setContato({ ...contato, last_name: e.target.value })}
            required/>
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email:</label>
          <Input
            type='email'
            name='email'
            value={contato.email}
            onChange={(e) => setContato({ ...contato, email: e.target.value })}
            required/>
        </div>
        <div className='select-divs'>
          <div className='form-select'>
            <label htmlFor='gender'>Gênero:</label>
            <Select
              name='gender'
              id='genero'
              onValueChange={(value) => setContato({ ...contato, gender: value })}
              value={contato.gender}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Masculino</SelectItem>
                <SelectItem value="F">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='form-select'>
            <label htmlFor='language'>Idioma:</label>
            <Select
              name='language'
              id='idioma'
              onValueChange={(value) => setContato({ ...contato, language: value })}
              value={contato.language}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingles">Inglês</SelectItem>
                <SelectItem value="Espanhol">Espanhol</SelectItem>
                <SelectItem value="Mandarim">Mandarim</SelectItem>
                <SelectItem value="Portugues">Português</SelectItem>
                <SelectItem value="Italiano">Italiano</SelectItem>
                <SelectItem value="Fijian">Fijian</SelectItem>
                <SelectItem value="Latvian">Latvian</SelectItem>
                <SelectItem value="Mongolian">Mongolian</SelectItem>
                <SelectItem value="Zulu">Zulu</SelectItem>
                <SelectItem value="Assamese">Assamese</SelectItem>
                <SelectItem value="Burmese">Burmese</SelectItem>
                <SelectItem value="Luxembourgish">Luxembourgish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='birthday'>Nascimento:</label>
          <Input
            type='date'
            name='birthday'
            value={contato.birthday}
            onChange={(e) => setContato({ ...contato, birthday: e.target.value })}
            required
            className='input-data'/>
        </div>
        <div className='form-control'>
          <label htmlFor='avatar'>URL do Avatar:</label>
          <Input
            type="text"
            name="avatar"
            value={contato.avatar}
            onChange={(e) => setContato({ ...contato, avatar: e.target.value })} 
            required/>
        </div>
        <Button type="submit" className="btn">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default EditContato;
