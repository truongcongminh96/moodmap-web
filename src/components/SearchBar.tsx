import {
  ArrowRightOutlined,
  BgColorsOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import type { FormEvent } from "react";
import type { UiCopy } from "../i18n/translations";
import type { MoodSceneSelection } from "../theme/moodScene";

interface SearchBarProps {
  city: string;
  copy: UiCopy;
  loading: boolean;
  sceneMenuOpen: boolean;
  moodSceneSelection: MoodSceneSelection;
  moodSceneOptions: ReadonlyArray<{ value: MoodSceneSelection; label: string }>;
  onCityChange: (value: string) => void;
  onSceneMenuOpenChange: (open: boolean) => void;
  onMoodSceneChange: (value: MoodSceneSelection) => void;
  onSubmit: () => void;
}

export function SearchBar({
  city,
  copy,
  loading,
  sceneMenuOpen,
  moodSceneSelection,
  moodSceneOptions,
  onCityChange,
  onSceneMenuOpenChange,
  onMoodSceneChange,
  onSubmit,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="search-shell">
      <form className="search-form" onSubmit={handleSubmit}>
        <Input
          aria-label={copy.search.cityAriaLabel}
          className="search-input"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder={copy.search.cityPlaceholder}
          prefix={<EnvironmentOutlined />}
          autoComplete="off"
          allowClear
        />
        <Select
          aria-label={copy.search.sceneAriaLabel}
          className="scene-select"
          open={sceneMenuOpen}
          value={moodSceneSelection}
          onChange={(value) => onMoodSceneChange(value)}
          onOpenChange={onSceneMenuOpenChange}
          options={moodSceneOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          suffixIcon={<BgColorsOutlined />}
          popupClassName="scene-select-dropdown"
          popupMatchSelectWidth={false}
        />
        <Button
          className="search-button"
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={loading}
          icon={!loading ? <ArrowRightOutlined /> : undefined}
        >
          {loading ? copy.search.submitting : copy.search.submit}
        </Button>
      </form>
    </div>
  );
}
