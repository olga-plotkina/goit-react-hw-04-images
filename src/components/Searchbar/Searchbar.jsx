import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import {
  SearchForm,
  StyledSearchbar,
  SearchFormButton,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

const schema = Yup.object().shape({ search: Yup.string().required() });

const initialValues = {
  search: '',
};

export const Searchbar = ({ submitProp }) => {
  const handleSubmit = (values, { resetForm }) => {
    submitProp(values);
    resetForm();
  };
  return (
    <StyledSearchbar>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchFormButton>

          <SearchInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="search" component="div" />
        </SearchForm>
      </Formik>
    </StyledSearchbar>
  );
};
