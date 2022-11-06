import * as Yup from 'yup';
import Notiflix from 'notiflix';
import { Formik, ErrorMessage } from 'formik';
import { StyledSubmitButton } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { SearchForm, StyledSearchbar, SearchInput } from './Searchbar.styled';

const schema = Yup.object().shape({ search: Yup.string().required() });

const initialValues = {
  search: '',
};

export const Searchbar = ({ submitProp, isSubmitting }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (values.search.trim() === '') {
      return Notiflix.Notify.failure('Tape your search query plese');
    }
    submitProp(values);
  };
  return (
    <StyledSearchbar>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <SearchForm>
          <StyledSubmitButton
            type="submit"
            disabled={isSubmitting}
            aria-label="Search"
          >
            <SearchIcon width="20" />
          </StyledSubmitButton>

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
